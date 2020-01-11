import React, {useEffect} from 'react';

function drawNumberToCanvas(canvas, ctx, number) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillText(number, canvas.width / 2, canvas.height / 2, canvas.width);
  const data = canvas.toDataURL('image/png');

  const link = document.querySelector("link[rel*='icon']");
  link.type = 'image/x-icon';
  link.href = data;
}

const FaviconDrawer = ({number = 'Code'}) => {

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = '110px sans-serif';
  }, [])

  useEffect(() => {
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    drawNumberToCanvas(canvas, ctx, number)
  }, [number])

  return null;
}

export default FaviconDrawer;
