import { css } from '@emotion/core'
import styled from '@emotion/styled'

const theme = {
  colors: {
    border: '#e5e9f2',
    text: '#1d1d1d',
    outline: '#d3dce6',
    fill: '#928f8f',
    field: '#f5f7ff',
    fieldBorder: '#e5e9f2',
    background: 'none',
    select: '#4184f3',
  },
  fonts: {
    heading: '300 2em/2.2em Avenir',
    label: '600 .8em Avenir',
    code: '600 .8em Menlo',
    body: '500 .9em/1.15em Avenir',
    caption: '400 .8em/.8em Avenir',
  },
}

export default theme

export const ContainerStyle = css`
  width: 100%;
  letter-spacing: 0.08em;
  box-sizing: border-box;
  padding: 1em 1.25em;
  border-radius: 0.25em;
  font: ${theme.fonts.body};
  height: 44px;
  color: ${theme.colors.body};
  background-color: ${theme.colors.field};
  border: 1px solid ${theme.colors.fieldBorder};
`

export const AnchorStyle = css`
  position: relative;
  top: -150px;
  visible: false;
`

export const KnobStyle = css`
  content: '';
  position: absolute;
  top: -1px;
  visibility: visible;
  ${ContainerStyle};
  height: 24px;
  padding: 0;
  margin: 0;
  width: 24px;
  display: block;
  border-radius: 100%;
  transform: scale(0.8);
  border-color: #fff;
  transition: all 0.2s;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
`
