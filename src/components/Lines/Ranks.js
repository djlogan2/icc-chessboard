import React from 'react'
import {
  RANKS_DISABLED,
  RANKS_LEFT_SIDE,
  RANKS_RIGHT_SIDE,
  RANKS_ARRAY
} from '../../constants/boardConstants'
import { WHITE_PLAYER_PERSPECTIVE } from '../../constants/systemConstants'

const Ranks = ({ width, height, side, perspective, ranksStyle }) => {
  if (side === RANKS_DISABLED) {
    return null
  }

  return (
    <div
      style={{
        width,
        height,
        left: side === RANKS_LEFT_SIDE && 0,
        right: side === RANKS_RIGHT_SIDE && 0,
        position: 'absolute',
        display: 'flex',
        flexDirection:
          WHITE_PLAYER_PERSPECTIVE === perspective
            ? 'column-reverse'
            : 'column',
        justifyContent: 'space-around'
      }}
    >
      {RANKS_ARRAY.map((rank, index) => {
        return (
          <p
            style={{
              textAlign: side === RANKS_LEFT_SIDE ? 'right' : 'left',
              ...ranksStyle
            }}
            key={index}
          >
            {rank}
          </p>
        )
      })}
    </div>
  )
}

export default Ranks
