import { useState } from 'react';
import gsap from 'gsap';
import Dice from './Dice';
import { Button } from 'primereact/button';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { rollDice } from '../../services/game';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { updateUserSession } from '../../store/gameSlice';

const GameBoard: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const session = useSelector((state:RootState) => state.game.session) || null;
  const win = useSelector((state:RootState) => state.game.session?.win) || false;
  const attempts = useSelector((state:RootState) => state.game.session?.attempts) || 0;
  const rewardName = useSelector((state:RootState) => state.game.session?.rewardName) || '';
  const sessionId = useSelector((state:RootState) => state.game.session?.session._id);

  interface IUpdateUserSession {
    attempts: number;
    win: boolean;
    rewardName: string | null;
  }
  
  const [dices, setDices] = useState<number[]>([0, 0, 0, 0, 0]);

  const play = async() => {
    if(!sessionId) return;
    try {
      const response = await rollDice(sessionId);
      
      if(response.success) {
        setDices(gsap.utils.shuffle(response.data.result));
        const userData:IUpdateUserSession = {attempts: response.data.attempts, win: response.data.win, rewardName: response.data.reward};
        
        toast.success(response.message, { position: "top-center" });
        dispatch(updateUserSession(userData));
      }else{

        toast.error(response.message, { position: "top-center" });
      }

    } catch (error) {
      console.error('error failed:', error);
    }

    
  }
    
  return (
    <div className="playground w-full h-full p-3 d-flex flex-column justify-content-between align-items-center ">
      {session === null && (
        <div className="InfoCard w-full d-flex flex-column align-items-center justify-content-center">
         <p className='messgae'>Le jeu n'est pas disponible pour le moment.</p>
         <p className='lose'>Restez à l'écoute pour la prochaine session de jeu !</p>
        </div>
      )}

      {win == true && (
          <div className="InfoCard w-full d-flex flex-column align-items-center justify-content-center">
            <p className='messgae'>Bravo! Vous avez gagné 👏</p>
            <p className='reward'>{rewardName}</p>
          </div>
      )}

      {(win == false && attempts === 0 && session) && (
          <div className="InfoCard w-full d-flex flex-column align-items-center justify-content-center">
            <p className='messgae'>Tentatives épuisées pour le moment.</p>
            <p className='lose'>Restez à l'écoute pour la prochaine session de jeu !</p>
          </div>
      )}

      {(win == false && attempts > 0) && (
          <>
            <div className="d-flex w-full justify-content-end">
              Tentative: {attempts || 1}
            </div>
            <div>
              {dices.map((dice, index) => (
                <Dice key={index} value={dice} />
              ))}
            </div>
            <div className='w-full d-flex justify-content-center'>
              <Button label="JOUER" onClick={play}/>
            </div>
          </>
        )}
      <ToastContainer />
    </div>
  )
}


export default GameBoard