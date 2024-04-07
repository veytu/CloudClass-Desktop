import React from 'react';

import { PathOptions } from '../svg-dict';

export const path = ({ iconPrimary }: PathOptions) => {
  console.log('iconPrimary', iconPrimary)
  return (
    <>
      <g opacity="0.5">
        <path
          d="M24.1709 22.5512L24.9143 23.1155L24.1709 22.5512C23.9956 22.7822 23.6519 23.1359 23.426 23.3178C22.3226 24.2063 21.1265 24.2794 17.8976 24.3718C17.2564 24.3902 16.6173 24.4009 15.9997 24.4009C15.4605 24.4009 14.905 24.3927 14.3458 24.3784C10.8903 24.2901 9.61116 24.2141 8.47826 23.2482C8.3099 23.1046 8.05223 22.8403 7.91303 22.6683C6.97302 21.507 6.93304 20.3332 6.93304 17.1359C6.93304 14.4681 6.96082 13.4734 7.58973 12.4554C7.90399 11.9467 8.51185 11.3388 9.02056 11.0246C9.50991 10.7223 10.0618 10.5518 10.8883 10.4619C11.7406 10.3691 12.8116 10.3679 14.3378 10.3679H17.4145C19.052 10.3679 20.2035 10.3692 21.1146 10.4719C21.9991 10.5716 22.5809 10.7603 23.0864 11.0931C23.5269 11.3832 24.051 11.9074 24.3411 12.3479C25.0347 13.4012 25.0664 14.4838 25.0664 17.3844C25.0664 20.335 25.0311 21.4181 24.1709 22.5512Z"
          stroke={iconPrimary}
          strokeWidth="1.86667"
        />
        <path
          d="M14.1036 14.4139C15.4436 13.2832 17.5341 13.5568 18.7728 15.0249C19.4004 15.7687 19.689 16.6764 19.6467 17.5381L20.3329 14.4133"
          stroke={iconPrimary}
          strokeWidth="1.86667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.9912 19.8071C16.6511 20.9377 14.5607 20.6642 13.3219 19.1961C12.6944 18.4523 12.4058 17.5445 12.4481 16.6829L11.9992 19.8074"
          stroke={iconPrimary}
          strokeWidth="1.86667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.2497 10.046L12.4632 9.1408C12.6762 8.23787 13.4821 7.59991 14.4098 7.59991H17.5896C18.5173 7.59991 19.3233 8.23787 19.5362 9.1408L19.7497 10.046"
          stroke={iconPrimary}
          strokeWidth="1.86667"
          strokeLinecap="round"
        />
      </g>
    </>
  )
};

export const viewBox = '0 0 32 32';
