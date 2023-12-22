export const getCurrentTime = () => {
    const fullISOString = new Date().toISOString();
    const year = fullISOString.split("T")[0];
    const time = fullISOString.split("T")[1].split(".")[0];
    return year + "/" + time;
};
  