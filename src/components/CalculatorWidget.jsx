import { useState } from 'react';
import { FaCalculator, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Button = ({ label, onClick, className = '', style = {} }) => (
    <button
      onClick={onClick}
      className={`calc-btn ${className}`}
      style={{
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        border: 'none',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
        ...style
      }}
      onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
      onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
      onMouseUp={(e) => e.target.style.transform = 'scale(1.1)'}
    >
      {label}
    </button>
);

const CalculatorWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputDigit = (digit) => {
    if (waitingForOperand) {
      setDisplay(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? String(digit) : display + digit);
    }
  };

  const inputDot = () => {
    if (!(/\./).test(display)) {
      setDisplay(display + '.');
      setWaitingForOperand(false);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const toggleSign = () => {
    setDisplay(String(parseFloat(display) * -1));
  };

  const percent = () => {
    const value = parseFloat(display);
    setDisplay(String(value / 100));
  };

  const performOperation = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operator) {
      const currentValue = prevValue || 0;
      const newValue = calculate(currentValue, inputValue, operator);
      setPrevValue(newValue);
      setDisplay(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (prev, next, op) => {
    switch (op) {
      case '+': return prev + next;
      case '-': return prev - next;
      case '*': return prev * next;
      case '/': return prev / next;
      case '=': return next;
      default: return next;
    }
  };

  return (
    <>
      <motion.button
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
        onClick={() => setIsOpen(true)}
        className="glass-card"
        style={{
           position: 'fixed',
           left: '20px',
           top: '160px', // Below Translate Widget (100px + 50px + 10px gap)
           zIndex: 45,
           width: '50px',
           height: '50px',
           borderRadius: '50%',
           border: '1px solid rgba(255, 255, 255, 0.1)',
           background: 'rgba(15, 23, 42, 0.6)',
           backdropFilter: 'blur(10px)',
           color: 'white',
           display: 'flex',
           alignItems: 'center',
           justifyContent: 'center',
           cursor: 'pointer',
           boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
        }}
        whileHover={{ scale: 1.1, backgroundColor: 'var(--accent)' }}
        whileTap={{ scale: 0.9 }}
      >
        <FaCalculator size={20} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(5px)',
                pointerEvents: 'auto'
            }}>
                {/* Backdrop click to close */}
                <div style={{ position: 'absolute', inset: 0 }} onClick={() => setIsOpen(false)} />

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="glass-card"
                    style={{
                        padding: '25px',
                        borderRadius: '30px',
                        background: 'rgba(20, 20, 35, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        position: 'relative',
                        width: '320px'
                    }}
                >
                    <button 
                        onClick={() => setIsOpen(false)}
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: 'transparent',
                            border: 'none',
                            color: '#666',
                            cursor: 'pointer'
                        }}
                    >
                        <FaTimes />
                    </button>

                    <div style={{ marginBottom: '20px', textAlign: 'right', padding: '10px' }}>
                        <div style={{
                            fontSize: '3.5rem',
                            fontWeight: '300',
                            color: 'white',
                            height: '60px',
                            overflow: 'hidden'
                        }}>
                            {display}
                        </div>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '12px'
                    }}>
                         <Button label="AC" onClick={clear} style={{ color: '#000', background: '#A5A5A5' }} />
                         <Button label="+/-" onClick={toggleSign} style={{ color: '#000', background: '#A5A5A5' }} />
                         <Button label="%" onClick={percent} style={{ color: '#000', background: '#A5A5A5' }} />
                         <Button label="÷" onClick={() => performOperation('/')} style={{ background: '#FF9F0A' }} />

                         <Button label="7" onClick={() => inputDigit(7)} />
                         <Button label="8" onClick={() => inputDigit(8)} />
                         <Button label="9" onClick={() => inputDigit(9)} />
                         <Button label="×" onClick={() => performOperation('*')} style={{ background: '#FF9F0A' }} />

                         <Button label="4" onClick={() => inputDigit(4)} />
                         <Button label="5" onClick={() => inputDigit(5)} />
                         <Button label="6" onClick={() => inputDigit(6)} />
                         <Button label="-" onClick={() => performOperation('-')} style={{ background: '#FF9F0A' }} />

                         <Button label="1" onClick={() => inputDigit(1)} />
                         <Button label="2" onClick={() => inputDigit(2)} />
                         <Button label="3" onClick={() => inputDigit(3)} />
                         <Button label="+" onClick={() => performOperation('+')} style={{ background: '#FF9F0A' }} />

                         <Button label="0" onClick={() => inputDigit(0)} style={{ width: '132px', borderRadius: '40px', gridColumn: 'span 2' }} />
                         <Button label="." onClick={inputDot} />
                         <Button label="=" onClick={() => performOperation('=')} style={{ background: '#FF9F0A' }} />
                    </div>

                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CalculatorWidget;
