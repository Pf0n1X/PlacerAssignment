import { useEffect, useState } from 'react';
import AutoComplete from '../AutoComplete/AutoComplete';
import Input from '../Input/Input';
import MessagePopup from '../MessagePopup/MessagePopup';
import classes from './MeteorForm.module.css';

interface MeteorLanding {
  year: string;
  mass: string;
}

function MeteorForm() {
  const [landings, setLandings] = useState<Array<MeteorLanding>>([]);
  const [year, setYear] = useState<string>('');
  const [massText, setMassText] = useState<string>('');
  const [mass, setMass] = useState<number>(0);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);

  useEffect(() => {
    fetch('https://data.nasa.gov/resource/y77d-th95.json')
      .then(res => res.json())
      .then(data => {
        setLandings(data);
      });
  }, []);

  useEffect(() => {
    const filteredLandingsCount = year
      ? mass
        ? landings.filter(
            landing => landing.year?.startsWith(year) && +landing.mass > mass
          ).length
        : landings.filter(landing => landing.year?.startsWith(year)).length
      : 0;

    // If no landings were found for both criteria, find the first landing with
    // A fitting fitting mass and show results for that landing's year.
    if (year && mass && filteredLandingsCount === 0) {
      const landingWithFittingMass = landings.find(
        landing => +landing.mass > mass
      );

      if (landingWithFittingMass) {
        setYear(landingWithFittingMass.year.slice(0, 4));
      }

      if (!isPopupOpen) {
        setIsPopupOpen(true);
      }
    }
  }, [mass, year]);

  const possibleYears: string[] = landings
    .filter(landing => landing.year) // Only landings with existing value for 'year' will be shown.
    .map(landing => landing.year.substring(0, 4)) // Retrieve the years
    .filter((year, index, self) => self.indexOf(year) === index); // Filter The unique years

  const filteredLandingsCount = year
    ? mass
      ? landings.filter(
          landing => landing.year?.startsWith(year) && +landing.mass > mass
        ).length
      : landings.filter(landing => landing.year?.startsWith(year)).length
    : 0;

  const onMassInputClick = () => {
    setMass(+massText);
  };

  const onPopupClose = () => {
    setIsPopupOpen(false);
  };

  const popupText = filteredLandingsCount
    ? 'No Results were found the year entered. An alternative option was found.'
    : 'No Results.';

  return (
    <div className={classes.meteorform}>
      <h1 className={classes.title}>Meteor Landing Search</h1>
      <div className={classes.content}>
        <AutoComplete
          value={year}
          selectValue={setYear}
          possibleValues={possibleYears}
          className={classes.autocomplete}
        />
        <Input
          type='number'
          className={classes.input}
          disabled={year.length === 0}
          placeholder='Mass is bigger than:'
          value={massText}
          setValue={setMassText}
          onClick={onMassInputClick}
        />
      </div>
      {year && (
        <div>A total of {filteredLandingsCount} landings were found.</div>
      )}
      <MessagePopup isOpen={isPopupOpen} closePopup={() => {}}>
        <h3 className={classes.popupTitle}>Something happened.</h3>
        <div className={classes.popupContent}>{popupText}</div>
        <button className={classes.popupBtn} onClick={onPopupClose}>
          Close
        </button>
      </MessagePopup>
    </div>
  );
}

export default MeteorForm;
