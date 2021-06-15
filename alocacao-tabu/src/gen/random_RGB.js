function random_RGB() {
  var color_1 = Math.floor(Math.random() * 255 + 1);
  var color_2 = Math.floor(Math.random() * 255 + 1);
  var color_3 = Math.floor(Math.random() * 255 + 1);

  var result = [
    "rgba(" + color_1 + "," + color_2 + "," + color_3 + ",0.2)",
    "rgba(" + color_1 + "," + color_2 + "," + color_3 + ",1.0)",
  ];

  return result;
}

export default random_RGB;
