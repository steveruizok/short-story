import { css } from 'react-emotion'

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
    code: '500 1em/1.2em Menlo',
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
  font: ${theme.fonts.body};
  color: ${theme.colors.body};
  background-color: ${theme.colors.field};
  border: 1px solid ${theme.colors.fieldBorder};
  border-radius: 0.25em;
`
