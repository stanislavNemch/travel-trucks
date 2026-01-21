"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/auth";
import { Button } from "@/components/Button/Button";
import styles from "./page.module.css";
import clsx from "clsx";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be at least 6 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            setIsLoading(true);
            try {
                await login(values.email, values.password);
                toast.success("Login successful!");
                router.push("/");
            } catch (error) {
                toast.error("Login failed. Please try again.");
            } finally {
                setIsLoading(false);
            }
        },
    });

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <h1 className={styles.title}>Welcome to TravelTrucks</h1>
                <p className={styles.subtitle}>Sign in to your account</p>
                
                <form onSubmit={formik.handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
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
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                            className={clsx(
                                styles.input,
                                formik.touched.password &&
                                    formik.errors.password &&
                                    styles.error
                            )}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className={styles.errorMessage}>
                                {formik.errors.password}
                            </div>
                        ) : null}
                    </div>

                    <Button
                        type="submit"
                        className={styles.submitButton}
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>

                <div className={styles.demoInfo}>
                    <p className={styles.demoText}>
                        <strong>Demo Mode:</strong> Use any email and password (minimum 6 characters) to login
                    </p>
                </div>
            </div>
        </div>
    );
}
