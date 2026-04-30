window.AccountantCharacter = (function () {

  const PIXEL = 3;

  const PALETTE = {
    skin:    '#F4C28A',
    skinD:   '#D9965A',
    hair:    '#2C1A0E',
    suit:    '#1a2744',
    suitL:   '#253460',
    shirt:   '#E8E4D8',
    tie:     '#8B1A1A',
    tieL:    '#B02020',
    glasses: '#1a1a1a',
    lens:    'rgba(160,210,255,0.35)',
    paper:   '#F5F0E0',
    ink:     '#334',
    shoe:    '#111',
    bg:      'transparent',
    green:   '#3dd68c',
    red:     '#ff6b6b',
    yellow:  '#ffd700',
    white:   '#ffffff',
    shadow:  'rgba(0,0,0,0.13)',
  };

  function px(n) { return n * PIXEL; }

  function rect(ctx, x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(px(x), px(y), px(w), px(h));
  }

  function drawBase(ctx, frame, state) {
    const bob = Math.sin(frame * 0.06) * (state === 'idle' ? 0.4 : state === 'happy' ? 1.1 : 0.2);
    const bodyY = 4 + bob;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // shadow
    ctx.fillStyle = PALETTE.shadow;
    ctx.beginPath();
    ctx.ellipse(px(11), px(34), px(5), px(1.2), 0, 0, Math.PI * 2);
    ctx.fill();

    // ── legs ──
    rect(ctx, 5, 28 + bob, 3, 5, PALETTE.suit);
    rect(ctx, 10, 28 + bob, 3, 5, PALETTE.suit);
    // shoes
    rect(ctx, 4, 32 + bob, 4, 2, PALETTE.shoe);
    rect(ctx, 10, 32 + bob, 4, 2, PALETTE.shoe);

    // ── body / jacket ──
    rect(ctx, 4, bodyY + 6, 10, 12, PALETTE.suit);
    // lapels
    rect(ctx, 7, bodyY + 6, 2, 4, PALETTE.suitL);
    rect(ctx, 9, bodyY + 6, 2, 4, PALETTE.suitL);
    // shirt
    rect(ctx, 8, bodyY + 7, 2, 7, PALETTE.shirt);
    // tie
    rect(ctx, 8, bodyY + 7, 2, 2, PALETTE.tieL);
    rect(ctx, 8, bodyY + 9, 2, 4, PALETTE.tie);

    // ── arms ──
    const armSwing = Math.sin(frame * 0.07) * (state === 'happy' ? 2.5 : 0.8);

    if (state === 'happy') {
      // arms raised in celebration
      rect(ctx, 1, bodyY + 5 - armSwing, 3, 7, PALETTE.suit);
      rect(ctx, 14, bodyY + 5 - armSwing, 3, 7, PALETTE.suit);
      // hands
      rect(ctx, 1, bodyY + 3 - armSwing, 2, 2, PALETTE.skin);
      rect(ctx, 14, bodyY + 3 - armSwing, 2, 2, PALETTE.skin);
    } else if (state === 'sad') {
      // arms drooped down
      rect(ctx, 1, bodyY + 8 + Math.abs(armSwing), 3, 7, PALETTE.suit);
      rect(ctx, 14, bodyY + 8 + Math.abs(armSwing), 3, 7, PALETTE.suit);
      rect(ctx, 1, bodyY + 14 + Math.abs(armSwing), 2, 2, PALETTE.skin);
      rect(ctx, 14, bodyY + 14 + Math.abs(armSwing), 2, 2, PALETTE.skin);
    } else {
      // holding clipboard on right, left arm at side
      rect(ctx, 1, bodyY + 7, 3, 7, PALETTE.suit);
      rect(ctx, 1, bodyY + 13, 2, 2, PALETTE.skin);
      // right arm holding paper
      rect(ctx, 14, bodyY + 7 + armSwing * 0.3, 3, 6, PALETTE.suit);
      // clipboard / paper
      rect(ctx, 16, bodyY + 6, 4, 5, PALETTE.paper);
      rect(ctx, 16, bodyY + 6, 4, 1, PALETTE.ink); // top line
      rect(ctx, 16, bodyY + 8, 3, 1, PALETTE.ink); // line 2
      rect(ctx, 16, bodyY + 9, 2, 1, PALETTE.ink); // line 3
    }

    // ── neck ──
    rect(ctx, 8, bodyY + 4, 2, 3, PALETTE.skin);

    // ── head ──
    const headWobble = state === 'sad' ? 1 : 0;
    rect(ctx, 5, bodyY - headWobble, 8, 8, PALETTE.skin);
    // hair
    rect(ctx, 5, bodyY - headWobble, 8, 2, PALETTE.hair);
    rect(ctx, 5, bodyY - headWobble, 1, 4, PALETTE.hair);
    rect(ctx, 12, bodyY - headWobble, 1, 4, PALETTE.hair);

    // ears
    rect(ctx, 4, bodyY + 2 - headWobble, 1, 2, PALETTE.skinD);
    rect(ctx, 13, bodyY + 2 - headWobble, 1, 2, PALETTE.skinD);

    // ── glasses ──
    rect(ctx, 5, bodyY + 3 - headWobble, 3, 2, PALETTE.lens);
    rect(ctx, 10, bodyY + 3 - headWobble, 3, 2, PALETTE.lens);
    // frames
    ctx.strokeStyle = PALETTE.glasses;
    ctx.lineWidth = 1;
    ctx.strokeRect(px(5), px(bodyY + 3 - headWobble), px(3), px(2));
    ctx.strokeRect(px(10), px(bodyY + 3 - headWobble), px(3), px(2));
    // bridge
    ctx.beginPath();
    ctx.moveTo(px(8), px(bodyY + 4 - headWobble));
    ctx.lineTo(px(10), px(bodyY + 4 - headWobble));
    ctx.stroke();
    // arms
    ctx.beginPath();
    ctx.moveTo(px(5), px(bodyY + 4 - headWobble));
    ctx.lineTo(px(4), px(bodyY + 4 - headWobble));
    ctx.moveTo(px(13), px(bodyY + 4 - headWobble));
    ctx.lineTo(px(14), px(bodyY + 4 - headWobble));
    ctx.stroke();

    // ── eyes ──
    if (state === 'sad') {
      // downcast X eyes
      rect(ctx, 6, bodyY + 3 - headWobble, 1, 1, PALETTE.hair);
      rect(ctx, 7, bodyY + 4 - headWobble, 1, 1, PALETTE.hair);
      rect(ctx, 11, bodyY + 3 - headWobble, 1, 1, PALETTE.hair);
      rect(ctx, 12, bodyY + 4 - headWobble, 1, 1, PALETTE.hair);
    } else {
      const blink = (Math.floor(frame / 90) % 8 === 0);
      if (!blink) {
        rect(ctx, 6, bodyY + 3 - headWobble, 1, 1, PALETTE.hair);
        rect(ctx, 11, bodyY + 3 - headWobble, 1, 1, PALETTE.hair);
        if (state === 'happy') {
          // little sparkle dots
          rect(ctx, 7, bodyY + 2 - headWobble, 1, 1, PALETTE.yellow);
          rect(ctx, 10, bodyY + 2 - headWobble, 1, 1, PALETTE.yellow);
        }
      }
    }

    // ── mouth ──
    if (state === 'happy') {
      // big smile
      rect(ctx, 6, bodyY + 6 - headWobble, 1, 1, PALETTE.hair);
      rect(ctx, 7, bodyY + 7 - headWobble, 2, 1, PALETTE.hair);
      rect(ctx, 11, bodyY + 6 - headWobble, 1, 1, PALETTE.hair);
      // white teeth
      rect(ctx, 8, bodyY + 7 - headWobble, 3, 1, PALETTE.white);
    } else if (state === 'sad') {
      // frown
      rect(ctx, 6, bodyY + 7 - headWobble, 1, 1, PALETTE.hair);
      rect(ctx, 7, bodyY + 6 - headWobble, 2, 1, PALETTE.hair);
      rect(ctx, 9, bodyY + 6 - headWobble, 1, 1, PALETTE.hair);
      rect(ctx, 10, bodyY + 6 - headWobble, 1, 1, PALETTE.hair);
      rect(ctx, 11, bodyY + 7 - headWobble, 1, 1, PALETTE.hair);
      // tear
      const tearDrop = Math.sin(frame * 0.05) * 0.5;
      rect(ctx, 5, bodyY + 6 + tearDrop - headWobble, 1, 2, '#85B7EB');
    } else {
      // neutral slight smile
      rect(ctx, 7, bodyY + 6 - headWobble, 4, 1, PALETTE.hair);
      rect(ctx, 6, bodyY + 5 - headWobble, 1, 1, PALETTE.hair);
      rect(ctx, 11, bodyY + 5 - headWobble, 1, 1, PALETTE.hair);
    }

    // ── happy celebration particles ──
    if (state === 'happy') {
      const t = frame * 0.08;
      const particles = [
        { x: 2,  y: 4,  color: PALETTE.green,  phase: 0   },
        { x: 16, y: 3,  color: PALETTE.yellow,  phase: 1.2 },
        { x: 1,  y: 8,  color: PALETTE.green,  phase: 2.4 },
        { x: 17, y: 10, color: PALETTE.yellow, phase: 0.8 },
        { x: 9,  y: 1,  color: PALETTE.white,   phase: 1.8 },
      ];
      particles.forEach(p => {
        const alpha = (Math.sin(t + p.phase) + 1) / 2;
        const size  = Math.ceil((Math.sin(t * 1.3 + p.phase) + 1.2) / 2);
        ctx.globalAlpha = alpha * 0.9;
        rect(ctx, p.x, p.y, size, size, p.color);
        ctx.globalAlpha = 1;
      });
    }

    // ── sad sweat drops ──
    if (state === 'sad') {
      const t = frame * 0.04;
      [{ x: 14, phase: 0 }, { x: 3, phase: 1.5 }].forEach(p => {
        const yOff = ((t + p.phase) % 3) * 2;
        ctx.globalAlpha = 0.7;
        rect(ctx, p.x, 6 + yOff, 1, 1, '#85B7EB');
        ctx.globalAlpha = 1;
      });
    }
  }

  function create(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    const canvas = document.createElement('canvas');
    const SIZE = 90;
    canvas.width  = SIZE;
    canvas.height = SIZE;
    canvas.style.cssText = 'display:block; width:100%; height:100%; image-rendering:pixelated; image-rendering:crisp-edges;';
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let frame = 0;
    let currentState = 'idle';
    let rafId = null;

    function loop() {
      ctx.save();
      ctx.translate(18, 0);
      drawBase(ctx, frame, currentState);
      ctx.restore();
      frame++;
      rafId = requestAnimationFrame(loop);
    }

    loop();

    return {
      setState(state) {
        currentState = state;
        frame = 0;
      },
      destroy() {
        if (rafId) cancelAnimationFrame(rafId);
        canvas.remove();
      }
    };
  }

  return { create };
})();