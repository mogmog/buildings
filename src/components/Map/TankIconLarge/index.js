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
          d="m6.62722,32.60333c0,10.94739 3.57954,20.14565 7.91407,23.2784l27.78972,0l-0.03131,-27.83414l7.80556,0l-0.03131,27.83414l27.64793,0c4.33451,-3.13275 7.89941,-12.331 7.89941,-23.2784c0,-13.54725 -5.91487,-24.43729 -11.84911,-24.43729l-19.74852,0l-3.9184,3.9763l-7.80556,0l-4.07486,-3.9763l-19.74852,0c-5.93485,0 -11.84911,10.89005 -11.84911,24.43729zm0,27.2547l78.99408,0l0,7.95262l-78.99408,0l0,-7.95262zm35.54734,-51.69199l0,-3.55065l7.89941,0l0,3.55065l-7.89941,0z"
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
          d="m6.62722,32.60333c0,10.94739 3.57954,20.14565 7.91407,23.2784l27.78972,0l-0.03131,-27.83414l7.80556,0l-0.03131,27.83414l27.64793,0c4.33451,-3.13275 7.89941,-12.331 7.89941,-23.2784c0,-13.54725 -5.91487,-24.43729 -11.84911,-24.43729l-19.74852,0l-3.9184,3.9763l-7.80556,0l-4.07486,-3.9763l-19.74852,0c-5.93485,0 -11.84911,10.89005 -11.84911,24.43729zm0,27.2547l78.99408,0l0,7.95262l-78.99408,0l0,-7.95262zm35.54734,-51.69199l0,-3.55065l7.89941,0l0,3.55065l-7.89941,0z"
          id="Shape"
          fill="#00A6FF"
          fill-rule="nonzero"
        />
      </g>
    </svg>
  </div>
);
