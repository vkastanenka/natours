// React
import React, { Component } from "react";
// import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// Actions
import { getGuides } from "../../store/actions/userActions";
import { createTour } from "../../store/actions/tourActions";
import { updateTour } from "../../store/actions/tourActions";
import { clearErrors } from "../../store/actions/errorActions";

// Components
import Alert from "../Alert/Alert";
import Icon from "../Icon/Icon";
import Spinner from "../Spinner/Spinner";
import Auxiliary from "../HigherOrder/Auxiliary";
import InputGroup from "../Inputs/InputGroup";
import SelectGroup from "../Inputs/SelectGroup";
import TextAreaGroup from "../Inputs/TextAreaGroup";

class Tour extends Component {
  state = {
    // General
    name: "",
    duration: "",
    maxGroupSize: "",
    difficulty: "",
    price: "",
    summary: "",
    description: "",
    startDestinationAddress: "",
    startDestinationDescription: "",

    // Photos
    coverPhoto: "",
    galleryPhotos: "",

    // Dates
    bookingDates: [{ bookingDate1: "" }],

    // Destinations
    tourDestinations: [
      {
        destination1Long: "",
        destination1Lat: "",
        destination1Day: "",
        destination1Description: "",
      },
    ],

    // Guides
    leadGuide: "",
    guides: [{ guide1: "" }],

    // Form States
    submittingTour: false,
    editingTour: false,
    disableSubmitButton: false,

    // Errors
    errors: {},
  };
  componentDidMount() {
    if (!this.props.users.guides) {
      this.props.getGuides();
    }

    if (this.props.editingTour) {
      const bookingDates = this.props.tourInfo.startDates.map(
        (startDate, i) => {
          const d = new Date(startDate);
          let month = "" + (d.getMonth() + 1);
          let day = "" + d.getDate();
          const year = d.getFullYear();

          if (month.length < 2) month = "0" + month;
          if (day.length < 2) day = "0" + day;

          return {
            [`bookingDate${i + 1}`]: `${year}-${month}-${day}`,
          };
        }
      );

      const tourDestinations = this.props.tourInfo.locations.map(
        (location, i) => {
          return {
            [`destination${i + 1}Long`]: location.coordinates[0],
            [`destination${i + 1}Lat`]: location.coordinates[1],
            [`destination${i + 1}Day`]: location.day,
            [`destination${i + 1}Description`]: location.description,
          };
        }
      );

      // eslint-disable-next-line
      const tourLeadGuide = this.props.tourInfo.guides.filter((guide) => {
        if (guide.role === "lead-guide") return guide;
      });

      const guides = this.props.tourInfo.guides
      // eslint-disable-next-line
        .filter((guide) => {
          if (guide.role === "guide") return guide;
        })
        .map((guide, i) => {
          return { [`guide${i + 1}`]: guide._id };
        });

      // console.log(bookingDates);

      this.setState({
        // General
        name: this.props.tourInfo.name,
        duration: this.props.tourInfo.duration,
        maxGroupSize: this.props.tourInfo.maxGroupSize,
        difficulty: this.props.tourInfo.difficulty,
        price: this.props.tourInfo.price,
        summary: this.props.tourInfo.summary,
        description: this.props.tourInfo.description,
        startDestinationAddress: this.props.tourInfo.startLocation.address,
        startDestinationDescription: this.props.tourInfo.startLocation
          .description,

        // Photos
        coverPhoto: this.props.tourInfo.imageCover,
        galleryPhotos: this.props.tourInfo.images,

        // Dates
        bookingDates: bookingDates,

        // Destinations
        tourDestinations: tourDestinations,

        // Guides
        leadGuide: tourLeadGuide[0]._id,
        guides: guides,
      });
    }
  }

  // Binding timer to component instance
  timer = null;

  // If errors found from inputs, set them in state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        disableSubmitButton: false,
      });

      this.timer = setTimeout(() => {
        this.props.clearErrors();
        clearTimeout(this.timer);
      }, 6000);
    }

    if (nextProps.errors && this.props.editingTour) {
      this.setState({ editingTour: false });
    } else {
      this.setState({ submittingTour: false });
    }
  }

  // Clear any timers when form unmounts
  componentWillUnmount() {
    clearTimeout(this.timer);
    this.timer = null;
  }

  // State handler for input fields
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // State handler for photo upload
  handlePhoto = (e) => {
    this.setState({ [e.target.name]: e.target.files });
  };

  // State handler for nested fields
  onNestedChange = (e, i, state) => {
    const stateEntry = Object.entries(state);
    const stateCopy = [...stateEntry[0][1]];
    stateCopy[i - 1][e.target.name] = e.target.value;
    this.setState({ [stateEntry[0][0]]: stateCopy });
  };

  onTourSubmit = async (e) => {
    e.preventDefault();

    // Clear errors if any
    if (this.props.errors) {
      this.setState({ errors: {} });
      this.props.clearErrors();
    }

    // State change to let user know process is happening
    this.setState({ submittingTour: true, disableSubmitButton: true });

    // Set up new form
    const form = new FormData();

    // Apppend booking dates to form
    this.state.bookingDates.forEach((date) => {
      form.append("startDates", new Date(Object.values(date)[0]).toISOString());
    });

    // Append start location to form
    const startLocation = {};
    startLocation.description = this.state.startDestinationDescription;
    startLocation.coordinates = [
      this.state.tourDestinations[0].destination1Long,
      this.state.tourDestinations[0].destination1Lat,
    ];
    startLocation.address = this.state.startDestinationAddress;
    form.append("startLocation", JSON.stringify(startLocation));

    // Append guides to form
    const baseGuides = this.state.guides.map((guide) => {
      return Object.values(guide)[0];
    });
    const guides = [this.state.leadGuide, ...baseGuides];
    guides.forEach((guide) => {
      form.append("guides", guide);
    });

    // Append locations to form
    const locations = this.state.tourDestinations
      .map((stop) => {
        return Object.values(stop);
      })
      .map((location) => {
        return {
          coordinates: [location[0], location[1]],
          day: location[2],
          description: location[3],
        };
      });

    form.append("locations", JSON.stringify(locations));

    // Append the rest of the form data
    form.append("name", this.state.name);
    form.append("duration", this.state.duration);
    form.append("maxGroupSize", this.state.maxGroupSize);
    form.append("difficulty", this.state.difficulty);
    form.append("price", this.state.price);
    form.append("summary", this.state.summary);
    form.append("description", this.state.description);
    if (!this.props.editingTour) {
      form.append("imageCover", this.state.coverPhoto[0]);
    } else {
      form.append("imageCover", this.state.coverPhoto);
    }
    form.append("images", this.state.galleryPhotos[0]);
    form.append("images", this.state.galleryPhotos[1]);
    form.append("images", this.state.galleryPhotos[2]);

    // Post the form
    if (!this.props.editingTour) {
      await this.props.createTour(form);
    } else {
      await this.props.updateTour(this.props.tourInfo._id, form);
    }

    // Reset form and state change for success alert
    if (Object.keys(this.state.errors).length === 0) {
      this.setState({
        // General
        name: "",
        duration: "",
        maxGroupSize: "",
        difficulty: "",
        price: "",
        summary: "",
        description: "",
        startDestinationAddress: "",
        startDestinationDescription: "",

        // Photos
        coverPhoto: "",
        galleryPhotos: "",

        // Dates
        bookingDates: [{ bookingDate1: "" }],

        // Destinations
        tourDestinations: [
          {
            destination1Long: "",
            destination1Lat: "",
            destination1Day: "",
            destination1Description: "",
          },
        ],

        // Guides
        leadGuide: "",
        guides: [{ guide1: "" }],

        // Form States
        submittingTour: false,
        disableSubmitButton: false,
      });
    }
  };

  render() {
    const errors = [];
    const { loading, guides } = this.props.users;
    let buttonText = "Submit tour";

    if (this.state.submittingTour) {
      buttonText = "Submitting tour...";
    }

    if (Object.keys(this.state.errors).length > 0) {
      for (let err in this.state.errors) {
        errors.push(<p key={err}>{this.state.errors[err]}</p>);
      }
    }

    if (this.props.editingTour) {
      buttonText = "Update tour";
    } else if (this.props.editingTour && this.state.editingTour) {
      buttonText = "Updating tour...";
    }

    let formContent;
    let coverPhotoName;
    let galleryPhotoNames;
    let bookingDateInputs = [];
    let tourDestinationInputs = [];
    let leadGuideInput;
    let guideInputs = [];

    // Name of cover photo to appear below input
    if (this.state.coverPhoto) {
      if (typeof this.state.coverPhoto === "string") {
        coverPhotoName = <p className="form__label">{this.state.coverPhoto}</p>;
      } else {
        coverPhotoName = (
          <p className="form__label">{this.state.coverPhoto[0].name}</p>
        );
      }
    }

    // Name of gallery photos to appear below input
    if (this.state.galleryPhotos) {
      if (typeof this.state.galleryPhotos[0] === "string") {
        galleryPhotoNames = this.state.galleryPhotos.map((photo) => (
          <p key={photo} className="form__label">
            {photo}
          </p>
        ));
      } else {
        galleryPhotoNames = Object.values(this.state.galleryPhotos).map(
          (photo) => (
            <p key={photo.name} className="form__label">
              {photo.name}
            </p>
          )
        );
      }
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
            type="number"
            name={`destination${i}Day`}
            id={`destination${i}Day`}
            placeholder="Day"
            required={true}
            value={this.state.tourDestinations[i - 1][`destination${i}Day`]}
            onChange={(e) =>
              this.onNestedChange(e, i, {
                tourDestination: this.state.tourDestinations,
              })
            }
            htmlFor={`destination${i}Day`}
            label="Day"
          />
          <InputGroup
            type="text"
            name={`destination${i}Description`}
            id={`destination${i}Description`}
            placeholder="Location"
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
            label="Location"
          />
        </div>
      );
    }
    

    // Obtaining options for guides and lead guides
    if (!loading && guides) {
      const leadGuideOptions = guides
      // eslint-disable-next-line
        .filter((guide) => {
          if (guide.role === "lead-guide") {
            return guide;
          }
        })
        .map((leadGuide) => {
          return { value: leadGuide._id, label: leadGuide.name };
        });

      leadGuideOptions.unshift({
        value: "",
        label: "Lead guide",
        disabled: true,
        hidden: true,
      });

      const guideOptions = guides
      // eslint-disable-next-line
        .filter((guide) => {
          if (guide.role === "guide") {
            return guide;
          }
        })
        .map((guide) => {
          return { value: guide._id, label: guide.name };
        });

      guideOptions.unshift({
        value: "",
        label: "Guide",
        disabled: true,
        hidden: true,
      });

      // Adding inputs for guides based on state length
      for (let i = 1; i <= this.state.guides.length; i++) {
        guideInputs.push(
          <SelectGroup
            key={i}
            name={`guide${i}`}
            options={guideOptions}
            id={`guide${i}`}
            value={this.state.guides[i - 1][`guide${i}`]}
            required={true}
            onChange={(e) =>
              this.onNestedChange(e, i, { guides: this.state.guides })
            }
            htmlFor={`guide${i}`}
            label={`Guide ${i}`}
          />
        );
      }

      leadGuideInput = (
        <SelectGroup
          name="leadGuide"
          options={leadGuideOptions}
          id="leadGuide"
          value={this.state.leadGuide}
          required={true}
          onChange={(e) => this.onChange(e)}
          htmlFor="leadGuide"
          label="Lead guide"
        />
      );
    }

    if (loading && !guides) {
      formContent = <Spinner />;
    } else {
      formContent = (
        <Auxiliary>
          {Object.keys(this.state.errors).length > 0 ? (
            <Alert type="error" message={errors} />
          ) : null}
          <form className="form tour-form" onSubmit={this.onTourSubmit}>
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
              {this.props.editingTour
                ? `${this.props.tourInfo.name} Tour`
                : null}
            </h2>
            <h2 className="heading-secondary heading-secondary--smaller ma-bt-md">
              General
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
                { value: "difficult", label: "Difficult" },
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
            <InputGroup
              type="text"
              name="startDestinationAddress"
              id="startDestinationAddress"
              placeholder="Start address"
              value={this.state.startDestinationAddress}
              required={true}
              onChange={(e) => this.onChange(e)}
              htmlFor="startDestinationAddress"
              label="Start address"
            />
            <InputGroup
              type="text"
              name="startDestinationDescription"
              id="startDestinationDescription"
              placeholder="State/province and country"
              value={this.state.startDestinationDescription}
              required={true}
              onChange={(e) => this.onChange(e)}
              htmlFor="startDestinationDescription"
              label="State/province and country"
            />
            <h2 className="heading-secondary heading-secondary--smaller ma-bt-md">
              Photos
            </h2>
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
            <h2 className="heading-secondary heading-secondary--smaller ma-bt-md">
              Booking Dates
            </h2>
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
            <h2 className="heading-secondary heading-secondary--smaller ma-bt-md">
              Tour Destinations
            </h2>
            <div className="form__group form__links ma-bt-lg">
              <label
                className="btn-text"
                onClick={() => {
                  const plusNum = this.state.tourDestinations.length + 1;
                  const destinationCopy = [...this.state.tourDestinations];
                  destinationCopy.push({
                    [`destination${plusNum}Lat`]: "",
                    [`destination${plusNum}Long`]: "",
                    [`destination${plusNum}Day`]: "",
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
            <h2 className="heading-secondary heading-secondary--smaller ma-bt-md">
              Guides
            </h2>
            <div className="form__group form__links ma-bt-lg">
              <label
                className="btn-text"
                onClick={() => {
                  const plusNum = this.state.guides.length + 1;
                  const guidesCopy = [...this.state.guides];
                  guidesCopy.push({
                    [`guide${plusNum}`]: "",
                  });
                  this.setState({ guides: guidesCopy });
                }}
              >
                Assign a guide
              </label>
              <label
                className="btn-text"
                onClick={() => {
                  const guidesCopy = [...this.state.guides];
                  guidesCopy.pop();
                  this.setState({ guides: guidesCopy });
                }}
              >
                Remove a guide
              </label>
            </div>
            {leadGuideInput}
            {guideInputs}
            <div className="form__group">
              <button
                type="submit"
                className="btn btn--green"
                disabled={this.state.disableSubmitButton}
              >
                {buttonText}
              </button>
            </div>
          </form>
        </Auxiliary>
      );
    }

    return formContent;
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  errors: state.errors,
  tours: state.tours,
});

export default connect(mapStateToProps, {
  getGuides,
  clearErrors,
  createTour,
  updateTour,
})(Tour);
