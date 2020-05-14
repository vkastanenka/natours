// React
import React, { Component } from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { postTour } from "../../store/actions/tourActions";
import { updateTour } from "../../store/actions/tourActions";
import { clearErrors } from "../../store/actions/errorActions";

// Components
import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";
import Auxiliary from "../HigherOrder/Auxiliary";
import InputGroup from "../Inputs/InputGroup";
import SelectGroup from "../Inputs/SelectGroup";
import TextAreaGroup from "../Inputs/TextAreaGroup";

class Tour extends Component {
  state = {
    name: "",
    duration: "",
    maxGroupSize: "",
    difficulty: "",
    price: "",
    summary: "",
    description: "",
    coverPhoto: "",
    galleryPhotos: "",
    bookingDates: [{ bookingDate1: "" }],
    tourDestinations: [
      {
        destination1Lat: "",
        destination1Long: "",
        destination1Address: "",
        destination1Description: "",
      },
    ],
    guides: [{ guide1: '' }]
  };

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // State handler for photo upload
  handlePhoto = (e) => {
    this.setState({ [e.target.name]: e.target.files });
  };

  onNestedChange = (e, i, state) => {
    const stateEntry = Object.entries(state);
    const stateCopy = [...stateEntry[0][1]];
    stateCopy[i - 1][e.target.name] = e.target.value;
    this.setState({ [stateEntry[0][0]]: stateCopy });
  };

  onDestinationChange = (e, i) => {
    const destinationCopy = [...this.state.tourDestinations];
    destinationCopy[i - 1][e.target.name] = e.target.value;
    this.setState({ tourDestinations: destinationCopy });
  };

  render() {
    let coverPhotoName;
    let galleryPhotoNames;
    let bookingDateInputs = [];
    let tourDestinationInputs = [];

    // Name of cover photo to appear below input
    if (this.state.coverPhoto) {
      coverPhotoName = (
        <p className="form__label">{this.state.coverPhoto[0].name}</p>
      );
    }

    // Name of gallery photos to appear below input
    if (this.state.galleryPhotos) {
      galleryPhotoNames = Object.values(this.state.galleryPhotos).map(
        (photo) => (
          <p key={photo.name} className="form__label">
            {photo.name}
          </p>
        )
      );
    }

    // Adding more inputs for booking dates
    for (let i = 1; i <= this.state.bookingDates.length; i++) {
      bookingDateInputs.push(
        <InputGroup
          key={i}
          type="date"
          name={`bookingDate${i}`}
          id={`bookingDate${i}`}
          placeholder={`Booking Date ${i}`}
          required={true}
          value={this.state.bookingDates[i - 1][`bookingDate${i}`]}
          onChange={(e) =>
            this.onNestedChange(e, i, { bookingDates: this.state.bookingDates })
          }
          htmlFor={`bookingDate${i}`}
          label={`Booking Date ${i}`}
        />
      );
    }

    // Adding more inputs for tour destinations
    for (let i = 1; i <= this.state.tourDestinations.length; i++) {
      tourDestinationInputs.push(
        <div key={i} className="ma-bt-md">
          <h2 className="heading-secondary heading-secondary--smaller ma-bt-lg">
            {`Tour Destination ${i}`}
          </h2>
          <InputGroup
            type="number"
            name={`destination${i}Lat`}
            id={`destination${i}Lat`}
            placeholder="Latitude"
            required={true}
            value={this.state.tourDestinations[i - 1][`destination${i}Lat`]}
            onChange={(e) =>
              this.onNestedChange(e, i, {
                tourDestination: this.state.tourDestinations,
              })
            }
            htmlFor={`destination${i}Lat`}
            label="Latitude"
          />
          <InputGroup
            type="number"
            name={`destination${i}Long`}
            id={`destination${i}Long`}
            placeholder="Longitude"
            required={true}
            value={this.state.tourDestinations[i - 1][`destination${i}Long`]}
            onChange={(e) =>
              this.onNestedChange(e, i, {
                tourDestination: this.state.tourDestinations,
              })
            }
            htmlFor={`destination${i}Long`}
            label="Longitude"
          />
          <InputGroup
            type="text"
            name={`destination${i}Address`}
            id={`destination${i}Address`}
            placeholder="Address"
            required={true}
            value={this.state.tourDestinations[i - 1][`destination${i}Address`]}
            onChange={(e) =>
              this.onNestedChange(e, i, {
                tourDestination: this.state.tourDestinations,
              })
            }
            htmlFor={`destination${i}Address`}
            label="Address"
          />
          <InputGroup
            type="text"
            name={`destination${i}Description`}
            id={`destination${i}Description`}
            placeholder="State/province and country"
            value={this.state.startLocationDescription}
            required={true}
            value={
              this.state.tourDestinations[i - 1][`destination${i}Description`]
            }
            onChange={(e) =>
              this.onNestedChange(e, i, {
                tourDestination: this.state.tourDestinations,
              })
            }
            htmlFor={`destination${i}Description`}
            label="State/province and country"
          />
        </div>
      );
    }

    return (
      <Auxiliary>
        <form className="form tour-form">
          <Icon
            type="x"
            className="icon icon--large icon--black-primary icon--translate icon--active form__close-icon"
            onClick={this.props.popupClose}
          />
          <h2 className="heading-secondary heading-secondary--small">
            {this.props.editingTour ? "Editing" : "Create a new tour"}
          </h2>
          <br />
          <h2 className="heading-secondary heading-secondary--small ma-bt-lg">
            {this.props.editingTour ? `${this.props.tourName} Tour` : null}
          </h2>
          <InputGroup
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            value={this.state.name}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="name"
            label="Name"
          />
          <InputGroup
            type="number"
            name="duration"
            id="duration"
            placeholder="Duration (days)"
            value={this.state.duration}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="duration"
            label="Duration (days)"
          />
          <InputGroup
            type="number"
            name="maxGroupSize"
            id="maxGroupSize"
            placeholder="Max group size"
            value={this.state.maxGroupSize}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="maxGroupSize"
            label="Max group size"
          />
          <SelectGroup
            name="difficulty"
            options={[
              {
                value: "",
                label: "Difficulty",
                disabled: true,
                hidden: true,
              },
              { value: "easy", label: "Easy" },
              { value: "medium", label: "Medium" },
              { value: "hard", label: "Hard" },
            ]}
            id="difficulty"
            value={this.state.difficulty}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="difficulty"
            label="Difficulty"
          />
          <InputGroup
            type="number"
            name="price"
            id="price"
            placeholder="Price"
            value={this.state.price}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="price"
            label="Price"
          />
          <TextAreaGroup
            name="summary"
            id="summary"
            inputClass="form__textarea"
            placeholder="Provide a summary"
            value={this.state.summary}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="summary"
            label="Summary"
          />
          <TextAreaGroup
            name="description"
            id="description"
            inputClass="form__textarea"
            placeholder="Provide a description"
            value={this.state.description}
            required={true}
            onChange={(e) => this.onChange(e)}
            htmlFor="description"
            label="Description"
          />
          <div className="form__group form__photo-upload ma-bt-lg">
            <label htmlFor="coverPhoto" className="btn-text">
              Upload cover photo
            </label>
            <input
              id="coverPhoto"
              type="file"
              name="coverPhoto"
              className="invisible"
              onChange={(e) => this.handlePhoto(e)}
            />
            {coverPhotoName}
          </div>
          <div className="form__group form__photo-upload ma-bt-lg">
            <label htmlFor="galleryPhotos" className="btn-text">
              Upload gallery photos{" "}
              {`(${3 - this.state.galleryPhotos.length} remaining)`}
            </label>
            <input
              id="galleryPhotos"
              type="file"
              name="galleryPhotos"
              className="invisible"
              multiple="multiple"
              onChange={(e) => this.handlePhoto(e)}
            />
            {galleryPhotoNames}
          </div>
          <div className="form__group form__links ma-bt-lg">
            <label
              className="btn-text"
              onClick={() => {
                const plusNum = this.state.bookingDates.length + 1;
                const bookingsCopy = [...this.state.bookingDates];
                bookingsCopy.push({ [`bookingDate${plusNum}`]: "" });
                this.setState({ bookingDates: bookingsCopy });
              }}
            >
              Add booking date
            </label>
            <label
              className="btn-text"
              onClick={() => {
                if (this.state.bookingDates.length > 1) {
                  const bookingsCopy = [...this.state.bookingDates];
                  bookingsCopy.pop();
                  this.setState({ bookingDates: bookingsCopy });
                }
              }}
            >
              Remove booking date
            </label>
          </div>
          {bookingDateInputs}
          <div className="form__group form__links ma-bt-lg">
            <label
              className="btn-text"
              onClick={() => {
                const plusNum = this.state.tourDestinations.length + 1;
                const destinationCopy = [...this.state.tourDestinations];
                destinationCopy.push({
                  [`destination${plusNum}Lat`]: "",
                  [`destination${plusNum}Long`]: "",
                  [`destination${plusNum}Address`]: "",
                  [`destination${plusNum}Description`]: "",
                });
                this.setState({ tourDestinations: destinationCopy });
              }}
            >
              Add tour destination
            </label>
            <label
              className="btn-text"
              onClick={() => {
                if (this.state.tourDestinations.length > 1) {
                  const destinationCopy = [...this.state.tourDestinations];
                  destinationCopy.pop();
                  this.setState({ tourDestinations: destinationCopy });
                }
              }}
            >
              Remove tour destination
            </label>
          </div>
          {tourDestinationInputs}
          <div className="form__group form__links ma-bt-lg">
            <label
              className="btn-text"
              onClick={() => {
                this.setState((prevState) => ({
                  numTourDestinations: prevState.numTourDestinations + 1,
                }));
              }}
            >
              Assign a guide
            </label>
            <label
              className="btn-text"
              onClick={() => {
                if (this.state.numTourDestinations > 1) {
                  tourDestinationInputs.pop();
                  this.setState((prevState) => ({
                    numTourDestinations: prevState.numTourDestinations - 1,
                  }));
                }
              }}
            >
              Remove a guide
            </label>
          </div>
        </form>
      </Auxiliary>
    );
  }
}

export default Tour;
