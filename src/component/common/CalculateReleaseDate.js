/* eslint-disable prettier/prettier */
const CalculateReleaseDate = release_date => {
  let remainingTime = null;
  if (release_date) {
    const releaseDate = new Date(`${release_date}T00:00:00.000Z`);
    const currentTime = new Date();

    const timeDifference = releaseDate - currentTime;

    if (timeDifference > 0) {
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor(
        (timeDifference % (1000 * 60 * 60)) / (1000 * 60),
      );
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      remainingTime = {days, hours, minutes, seconds};
    } else {
      remainingTime = {days: '00', hours: '00', minutes: '00', seconds: '00'};
    }
  }

  return remainingTime;
};

export default CalculateReleaseDate;
