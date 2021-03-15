import PropTypes from 'prop-types'
import React from 'react'
import { DATA_TRANSFER } from '../../constants/systemConstants'
import LegalMove from '../LegalMove/LegalMove'

import Piece from '../Piece/Piece'

import styles from './square.module.css'

const Square = ({
  color,
  size,
  piece,
  handlePieceClick,
  pieceName,
  legalMoves,
  smallSize,
  arrowColors,
  showLegalMoves,
  signatureSquares,
  updateSquareMouseDown,
  updateSquareMouseUp,
  currentPiece,
  dataTransfer,
  updateDataTransfer
}) => {
  const handleMouseUp = (event) => {
    console.log(currentPiece)
    if (typeof event === 'object' && event.button === 2) {
      updateSquareMouseUp(pieceName)
    }
  }

  const handlePointerUp = (event) => {
    console.log(currentPiece)
  }

  const handleMouseDown = (event) => {
    if (typeof event === 'object' && event.button === 2) {
      if (event.altKey && event.shiftKey) {
        updateSquareMouseDown({ piece: pieceName, color: arrowColors.red })
      } else if (event.altKey && event.ctrlKey) {
        updateSquareMouseDown({ piece: pieceName, color: arrowColors.yellow })
      } else if (event.altKey) {
        updateSquareMouseDown({ piece: pieceName, color: arrowColors.green })
      } else {
        updateSquareMouseDown({ piece: pieceName, color: arrowColors.green })
      }
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()

    if (!!legalMoves && legalMoves.includes(pieceName)) {
      handlePieceClick(pieceName)
    } else {
      const clickedPieceName = event.dataTransfer.getData(DATA_TRANSFER)
      handlePieceClick(clickedPieceName)
    }
  }

  const handleTouchEnd = (event) => {
    if (dataTransfer) {
      if (!!legalMoves && legalMoves.includes(pieceName)) {
        console.log('legal')
        handlePieceClick(pieceName)
      } else {
        console.log(dataTransfer, currentPiece)
        handlePieceClick(dataTransfer)
      }
    }
  }

  return (
    <button
      onPointerUp={handlePointerUp}
      onDrop={handleDrop}
      onTouchEnd={handleTouchEnd}
      onDragOver={(e) => e.preventDefault()}
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
          pieceImage={piece?.image}
          description={piece?.description}
          size={size}
          pieceName={pieceName}
          currentPiece={currentPiece}
          updateDataTransfer={updateDataTransfer}
        />
      )}
      {showLegalMoves && !!legalMoves && legalMoves.includes(pieceName) && (
        <LegalMove size={size * 0.3} />
      )}
    </button>
  )
}

Square.propTypes = {
  color: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  piece: PropTypes.object
}

export default Square
