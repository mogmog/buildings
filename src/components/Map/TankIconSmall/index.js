import React, { Fragment } from 'react';

export default ({ fill = 'none', stroke = '#17BFA8' }) => (
  <svg width="36px" height="30px">
    <g>
      <title>background</title>
      <rect fill="none" id="canvas_background" height="32" width="38" y="-1" x="-1" />
    </g>
    <g>
      <title>Layer 1</title>
      <g fillRule="evenodd" fill="none" id="Tank-smallsize-icon">
        <path
          fillRule="nonzero"
          strokeWidth="1"
          stroke={stroke}
          fill={fill}
          id="Shape"
          d="m3.18724,13.61716c0,4.15755 1.35942,7.65082 3.00557,8.84056l10.55385,0l-0.01189,-10.57072l2.96436,0l-0.01189,10.57072l10.5,0c1.64614,-1.18974 3,-4.68301 3,-8.84056c0,-5.14491 -2.24632,-9.28068 -4.5,-9.28068l-7.5,0l-1.48811,1.5101l-2.96436,0l-1.54753,-1.5101l-7.5,0c-2.25391,0 -4.5,4.13577 -4.5,9.28068zm0,10.35066l30,0l0,3.02021l-30,0l0,-3.02021zm13.5,-19.63134l0,-1.34845l3,0l0,1.34845l-3,0z"
        />
      </g>
    </g>
  </svg>
);
