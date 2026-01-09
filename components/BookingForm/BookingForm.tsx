"use client";

import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button } from "../Button/Button";
import styles from "./BookingForm.module.css";
import clsx from "clsx";

export const BookingForm = () => {
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            date: null,
            comment: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            date: Yup.date().required("Booking date is required"),
            comment: Yup.string(),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log(values);
            toast.success("Booking successful!");
            localStorage.removeItem("bookingFormData");
            resetForm();
        },
    });

    // Load data from localStorage on mount
    useEffect(() => {
        const savedData = localStorage.getItem("bookingFormData");
        if (savedData) {
            try {
                const parsedData = JSON.parse(savedData);
                if (parsedData.date) {
                    parsedData.date = new Date(parsedData.date);
                }
                formik.setValues(parsedData);
            } catch (error) {
                console.error("Error parsing saved form data:", error);
            }
        }
    }, []);

    // Save data to localStorage on change
    useEffect(() => {
        localStorage.setItem("bookingFormData", JSON.stringify(formik.values));
    }, [formik.values]);

    return (
        <div className={styles.formWrapper}>
            <h3 className={styles.title}>Book your campervan now</h3>
            <p className={styles.subtitle}>
                Stay connected! We are always ready to help you.
            </p>
            <form onSubmit={formik.handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name*"
                        className={clsx(
                            styles.input,
                            formik.touched.name &&
                                formik.errors.name &&
                                styles.error
                        )}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <div className={styles.errorMessage}>
                            {formik.errors.name}
                        </div>
                    ) : null}
                </div>

                <div className={styles.inputGroup}>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email*"
                        className={clsx(
                            styles.input,
                            formik.touched.email &&
                                formik.errors.email &&
                                styles.error
                        )}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <div className={styles.errorMessage}>
                            {formik.errors.email}
                        </div>
                    ) : null}
                </div>

                <div className={styles.inputGroup}>
                    <DatePicker
                        selected={formik.values.date}
                        onChange={(date: Date | null) =>
                            formik.setFieldValue("date", date)
                        }
                        onBlur={() => formik.setFieldTouched("date", true)}
                        placeholderText="Booking date*"
                        className={clsx(
                            styles.input,
                            formik.touched.date &&
                                formik.errors.date &&
                                styles.error
                        )}
                        dateFormat="dd/MM/yyyy"
                        minDate={new Date()}
                    />
                    {formik.touched.date && formik.errors.date ? (
                        <div className={styles.errorMessage}>
                            {formik.errors.date as string}
                        </div>
                    ) : null}
                </div>

                <div className={styles.inputGroup}>
                    <textarea
                        id="comment"
                        name="comment"
                        placeholder="Comment"
                        className={clsx(styles.textarea)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.comment}
                    />
                </div>

                <Button type="submit" className={styles.submitButton}>
                    Send
                </Button>
            </form>
        </div>
    );
};
