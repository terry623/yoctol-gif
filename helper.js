const gif = require('./gif');

function getUrlVars(url) {
  const values = {};
  let hash;
  const hashes = url.split('&');
  for (let i = 0; i < hashes.length; i++) {
    hash = hashes[i].split('=');
    values[hash[0]] = hash[1];
  }
  return values;
}

async function askNickname(context) {
  if (context.state.asking) {
    context.setState({ nickname: context.event.text, asking: false });
    await context.sendText(`Hello ${context.state.nickname} !`);
  } else {
    context.resetState();
    context.setState({ asking: true });
    await context.sendText("Hi, what's your nickname?");
    await context.replySticker('1', '1');
  }
}

async function sendRandomGIF(context) {
  await context.sendText(`What's up ? ${context.state.nickname} ?`);
  await context.sendText(`Give you a special GIF`);
  const urls = await gif.random();
  await context.replyImage(urls[0], urls[1]);
  await context.sendText(urls[0]);
}

async function whatAction(context) {
  const { data } = context.event.postback;
  const { action } = getUrlVars(data);
  switch (action) {
    case 'search':
      await context.sendText('search search search');
      break;
    case 'hot':
      await context.sendText('hot hot hot');
      break;
    case 'random':
      await sendRandomGIF(context);
      break;
    default:
      await context.sendText(`It is not a valid command.`);
  }
}

async function showCarousel(context) {
  context.replyCarouselTemplate('this is a carousel template', [
    {
      thumbnailImageUrl:
        'https://media3.giphy.com/media/3oFyDaTqy8773R71cs/giphy.gif',
      title: '找個GIF',
      text: '隨便打些關鍵字',
      actions: [
        {
          type: 'postback',
          label: 'Go',
          data: 'action=search',
        },
      ],
    },
    {
      thumbnailImageUrl:
        'https://media3.giphy.com/media/3oFyDaTqy8773R71cs/giphy.gif',
      title: '熱門搜尋',
      text: '看看大家都找什麼',
      actions: [
        {
          type: 'postback',
          label: 'Go',
          data: 'action=hot',
        },
      ],
    },
    {
      thumbnailImageUrl:
        'https://media3.giphy.com/media/3oFyDaTqy8773R71cs/giphy.gif',
      title: '都可以啦',
      text: '什麼GIF都好',
      actions: [
        {
          type: 'postback',
          label: 'Go',
          data: 'action=random',
        },
      ],
    },
  ]);
}

module.exports = { askNickname, sendRandomGIF, showCarousel, whatAction };
