import React, { Fragment } from 'react';
import { Motion, spring } from 'react-motion';

import styles from './styles.less';

export default ({ fill = 'none', stroke = '#17BFA8' }) => (
  <div>
    <svg
      width="90px"
      height="74px"
      xmlns="http://www.w3.org/2000/svg"
      xlink="http://www.w3.org/1999/xlink"
      version="1.1"
    >
      <Motion defaultStyle={{ offset: 74 }} style={{ offset: spring(0, { stiffness: 25 }) }}>
        {interpolatingStyle => (
          <clipPath id="fill-mask">
            <rect width="90" height="74" transform={`translate(0 ${interpolatingStyle.offset})`} />
          </clipPath>
        )}
      </Motion>

      <g
        id="tank-outline"
        strokeWidth="3"
        stroke="#00A6FF"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <path
          d="m80.47145,36.86582l-8.88781,-8.31016l0,-19.84723l-7.61937,0l0,12.72307l-17.77853,-16.62304l-34.28571,32.05736l8.16216,-0.18184l0,32.41018l51.88428,0l0,-32.22834l8.52499,0zm-34.28571,27.59289l-16.93097,0l0,-18.99776l16.93097,0l0,18.99776zm16.44913,-8.1419l-11.12573,0l0,-10.96985l11.12573,0l0,10.96985z"
          id="Shape2"
        />
      </g>

      <g
        clipPath="url(#fill-mask)"
        id="Tank-smallsize-icon"
        stroke="none"
        stroke-width="1"
        fill="none"
        fill-rule="evenodd"
      >
        <path
          d="m80.47145,36.86582l-8.88781,-8.31016l0,-19.84723l-7.61937,0l0,12.72307l-17.77853,-16.62304l-34.28571,32.05736l8.16216,-0.18184l0,32.41018l51.88428,0l0,-32.22834l8.52499,0zm-34.28571,27.59289l-16.93097,0l0,-18.99776l16.93097,0l0,18.99776zm16.44913,-8.1419l-11.12573,0l0,-10.96985l11.12573,0l0,10.96985z"
          id="Shape"
          fill="#00A6FF"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  </div>
);
