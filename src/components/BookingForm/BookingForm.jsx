import { useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import css from "./BookingForm.module.css";

const BookingForm = ({ camper }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    startDate: null,
    endDate: null,
    comment: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFormData((prev) => ({
      ...prev,
      startDate: start,
      endDate: end,
    }));

    if (errors.startDate || errors.endDate) {
      setErrors((prev) => ({
        ...prev,
        startDate: "",
        endDate: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    } else {
      const selectedDate = new Date(formData.startDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
    }

    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    } else if (formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = "End date cannot be before start date";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data:", formData);
    console.log("Camper prop:", camper);

    const formErrors = validateForm();
    console.log("Validation errors:", formErrors);

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Starting form submission...");
      console.log("Camper object:", camper);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Booking data:", {
        camper: camper?.name || "No camper name",
        camperId: camper?.id || "No camper id",
        ...formData,
        startDate: formData.startDate?.toISOString(),
        endDate: formData.endDate?.toISOString(),
      });

      console.log("Form submitted successfully!");

      toast.success("Your booking request has been submitted successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setFormData({
        name: "",
        email: "",
        startDate: null,
        endDate: null,
        comment: "",
      });
    } catch (error) {
      console.error("Booking error details:", error);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);

      toast.error("Failed to submit booking. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setErrors({ submit: "Failed to submit booking. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.bookingForm}>
      <div className={css.formHeader}>
        <h3 className={css.formTitle}>Book your campervan now</h3>
        <p className={css.formSubtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <form onSubmit={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            className={`${css.input} ${errors.name ? css.error : ""}`}
          />
          {errors.name && <span className={css.errorText}>{errors.name}</span>}
        </div>

        <div className={css.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            className={`${css.input} ${errors.email ? css.error : ""}`}
          />
          {errors.email && (
            <span className={css.errorText}>{errors.email}</span>
          )}
        </div>

        <div className={css.formGroup}>
          <DatePicker
            selected={formData.startDate}
            onChange={handleDateChange}
            startDate={formData.startDate}
            endDate={formData.endDate}
            selectsRange
            minDate={new Date()}
            placeholderText="Select booking dates*"
            dateFormat="dd/MM/yyyy"
            className={`${css.input} ${css.datePicker} ${
              errors.startDate || errors.endDate ? css.error : ""
            }`}
            calendarClassName={css.calendar}
            popperClassName={css.datePickerPopper}
            showPopperArrow={false}
          />
          {errors.startDate && (
            <span className={css.errorText}>{errors.startDate}</span>
          )}
          {errors.endDate && (
            <span className={css.errorText}>{errors.endDate}</span>
          )}
        </div>

        <div className={css.formGroup}>
          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
            className={css.textarea}
          />
        </div>

        {errors.submit && (
          <div className={css.submitError}>{errors.submit}</div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`${css.submitButton} ${
            isSubmitting ? css.submitting : ""
          }`}
        >
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
