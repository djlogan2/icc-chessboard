import React from 'react'
import PropTypes from 'prop-types'
import { useDrop } from 'react-dnd'

import Piece from '../Piece/Piece'
import Circle from '../Circle/Circle'

import styles from './square.module.css'
import LegalMove from '../LegalMove/LegalMove'
import { MODE_EDIT } from '../../constants/systemConstants'

const Square = ({
  color,
  size,
  mode,
  circle,
  piece,
  circleColor,
  handlePieceClick,
  pieceName,
  legalMoves,
  smallSize,
  showLegalMoves,
  signatureSquares,
  updateSquareMouseDown,
  updateSquareMouseUp,
  currentPiece
}) => {
  const handleMouseUp = (event) => {
    if (typeof event === 'object' && event.button === 2) {
      updateSquareMouseUp(pieceName)
    }
  }

  const handleMouseDown = (event) => {
    if (typeof event === 'object' && event.button === 2) {
      updateSquareMouseDown(pieceName)
    }
  }

  const [, drop] = useDrop(
    () => ({
      accept: pieceName,
      canDrop: () => {
        handlePieceClick(pieceName)
        console.log('canDrop')

        console.log(legalMoves, pieceName)
        console.log(!!legalMoves && legalMoves.includes(pieceName))
        return !!legalMoves && legalMoves.includes(pieceName)
      },
      drop: () => handlePieceClick(pieceName),
      collect: (monitor) => ({
        canDrop: !!monitor.canDrop()
      })
    }),
    [pieceName, legalMoves, currentPiece]
  )

  return (
    <div ref={drop} role='Space'>
      <button
        onMouseUp={handleMouseUp}
        onMouseDown={handleMouseDown}
        onContextMenu={(e) => e.preventDefault()}
        className={styles.square}
        onClick={() => {
          handlePieceClick(pieceName)
        }}
        style={{
          width: size,
          height: size,
          backgroundColor:
            currentPiece === pieceName ? color.active : color.default,
          position: 'relative',
          outline: 'none'
        }}
      >
        {signatureSquares && smallSize > size && pieceName}
        {!!Object.keys(piece).length && (
          <Piece
            handlePieceClick={handlePieceClick}
            pieceImage={piece.image}
            description={piece.description || 'not now'}
            size={size * 0.8}
            pieceName={pieceName}
          />
        )}
        {!!circle && <Circle size={size * 0.8} strokeStyle={circleColor} />}
        {showLegalMoves &&
          !!legalMoves &&
          mode !== MODE_EDIT &&
          legalMoves.includes(pieceName) && <LegalMove size={size * 0.3} />}
      </button>
    </div>
  )
}

Square.propTypes = {
  color: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  circle: PropTypes.bool.isRequired,
  piece: PropTypes.object
}

export default Square
