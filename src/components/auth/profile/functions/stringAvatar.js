// Avatar name to color
const stringToColor = string => {
  try {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  } catch (err) {}
};

const stringAvatar = (name, width = 100) => {
  try {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: width,
        height: width,
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  } catch (err) {}
};

export default stringAvatar;
