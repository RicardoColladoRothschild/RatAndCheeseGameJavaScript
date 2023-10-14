const emojis = {
    '-': ' ',
    'O': '🚪',
    'X': '☣️ ',
    'I': '🧀',
    'PLAYER': '🐭',
    'BOMB_COLLISION': '💥',
    'GAME_OVER': '💀',
    'WIN': '🏆',
  };
  
  const maps = [];
maps.push(`
  IXXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  -XXXXXXXXX
  OXXXXXXXXX
`);
maps.push(`
  O--XXXXXXX
  X--XXXXXXX
  XX----XXXX
  X--XX-XXXX
  X-XXX--XXX
  X-XXXX-XXX
  XX--XX--XX
  XX--XXX-XX
  XXXX---IXX
  XXXXXXXXXX
  `);
maps.push(`
  I-----XXXX
  XXXXX-XXXX
  XX----XXXX
  XX-XXXXXXX
  XX-----XXX
  XXXXXX-XXX
  XX-----XXX
  XX-XXXXXXX
  XX-----OXX
  XXXXXXXXXX
`);
maps.push(`
  I-------XX
  XX-XX-X--X
  XX--X-X--X
  XX-XX-X--X
  XX---X--XX
  XXX-XX-XXX
  XX---XXXXX
  XX---X--XX
  XX---X-OXX
  XX------XX
`);