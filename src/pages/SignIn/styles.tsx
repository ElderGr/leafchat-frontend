import { Form } from '@unform/web';
import styled from 'styled-components';

export const Container = styled.div`
  >div:nth-child(1){
    height: 100vh;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }

    .custom-shape-divider-bottom-1650816291 {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      overflow: hidden;
      line-height: 0;
    }

    .custom-shape-divider-bottom-1650816291 svg {
      position: relative;
      display: block;
      width: calc(174% + 1.3px);
      height: 425px;
    }

    .custom-shape-divider-bottom-1650816291 .shape-fill {
      fill: #9AD359;
    }
`;

export const CustomForm = styled(Form)`
  width: 100%;
`;
