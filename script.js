"use strict";


/* ======================================
   ELEMENTS
====================================== */

const complaintForm =
    document.getElementById("complaintForm");

const studentName =
    document.getElementById("studentName");

const registerNumber =
    document.getElementById("registerNumber");

const department =
    document.getElementById("department");

const regionalLanguage =
    document.getElementById("regionalLanguage");

const customLanguage =
    document.getElementById("customLanguage");

const languageGroup =
    document.getElementById("languageGroup");

const customLanguageGroup =
    document.getElementById("customLanguageGroup");

const category =
    document.getElementById("category");

const description =
    document.getElementById("description");

const descriptionCounter =
    document.getElementById("descriptionCounter");

const complaintList =
    document.getElementById("complaintList");

const trackButton =
    document.getElementById("trackButton");

const complaintIdInput =
    document.getElementById("complaintId");

const trackResult =
    document.getElementById("trackResult");

const totalComplaints =
    document.getElementById("totalComplaints");

const pendingComplaints =
    document.getElementById("pendingComplaints");

const resolvedComplaints =
    document.getElementById("resolvedComplaints");


/* ======================================
   STORAGE
====================================== */

let complaints =
    JSON.parse(
        localStorage.getItem("studentComplaints")
    ) || [];


/* ======================================
   BASIC HELPERS
====================================== */

function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");

}


function setError(
    input,
    errorElementId,
    message
) {

    input.classList.add("input-error");

    document.getElementById(
        errorElementId
    ).textContent = message;

}


function clearError(
    input,
    errorElementId
) {

    input.classList.remove("input-error");

    document.getElementById(
        errorElementId
    ).textContent = "";

}


function showToast(
    message,
    type = "success"
) {

    const toast =
        document.getElementById("toast");

    const toastMessage =
        document.getElementById("toastMessage");

    const toastIcon =
        document.getElementById("toastIcon");


    toastMessage.textContent = message;


    if (type === "error") {
        toastIcon.textContent = "⚠";
    } else {
        toastIcon.textContent = "✓";
    }


    toast.classList.add("show");


    setTimeout(() => {
        toast.classList.remove("show");
    }, 3500);

}


/* ======================================
   STUDENT NAME
====================================== */

studentName.addEventListener(
    "input",
    function () {

        /*
         Allow only English letters.
         Spaces are permitted between name parts.
        */

        this.value =
            this.value.replace(
                /[^A-Za-z ]/g,
                ""
            );

        if (this.value.length > 14) {
            this.value =
                this.value.slice(0, 14);
        }

    }
);


function validateStudentName() {

    const value =
        studentName.value.trim();

    clearError(
        studentName,
        "studentNameError"
    );


    if (!value) {

        setError(
            studentName,
            "studentNameError",
            "Student name is required."
        );

        return false;
    }


    if (value.length > 14) {

        setError(
            studentName,
            "studentNameError",
            "Student name cannot exceed 14 characters."
        );

        return false;
    }


    if (!/^[A-Z]/.test(value)) {

        setError(
            studentName,
            "studentNameError",
            "The first letter must be a capital letter."
        );

        return false;
    }


    if (!/^[A-Za-z ]+$/.test(value)) {

        setError(
            studentName,
            "studentNameError",
            "Student name can contain letters only."
        );

        return false;
    }


    return true;
}


/* ======================================
   REGISTRATION NUMBER
====================================== */

registerNumber.addEventListener(
    "input",
    function () {

        /*
         Remove every non-numeric character.
        */

        this.value =
            this.value.replace(/\D/g, "");

        if (this.value.length > 17) {

            this.value =
                this.value.slice(0, 17);

        }

    }
);


function validateRegisterNumber() {

    clearError(
        registerNumber,
        "registerNumberError"
    );


    if (!registerNumber.value) {

        setError(
            registerNumber,
            "registerNumberError",
            "Registration number is required."
        );

        return false;
    }


    if (!/^\d{17}$/.test(
        registerNumber.value
    )) {

        setError(
            registerNumber,
            "registerNumberError",
            "Registration number must contain exactly 17 digits."
        );

        return false;
    }


    return true;
}


/* ======================================
   DEPARTMENT + REGIONAL LANGUAGE
====================================== */

department.addEventListener(
    "change",
    function () {

        clearError(
            department,
            "departmentError"
        );


        if (
            department.value ===
            "Regional Languages"
        ) {

            languageGroup.classList.remove(
                "hidden"
            );

        } else {

            languageGroup.classList.add(
                "hidden"
            );

            customLanguageGroup.classList.add(
                "hidden"
            );

            regionalLanguage.value = "";
            customLanguage.value = "";

        }

    }
);


regionalLanguage.addEventListener(
    "change",
    function () {

        if (
            regionalLanguage.value ===
            "Other"
        ) {

            customLanguageGroup.classList.remove(
                "hidden"
            );

        } else {

            customLanguageGroup.classList.add(
                "hidden"
            );

            customLanguage.value = "";

        }

    }
);


customLanguage.addEventListener(
    "input",
    function () {

        this.value =
            this.value.replace(
                /[^A-Za-z ]/g,
                ""
            );

    }
);


function validateDepartment() {

    clearError(
        department,
        "departmentError"
    );

    clearError(
        regionalLanguage,
        "regionalLanguageError"
    );

    clearError(
        customLanguage,
        "customLanguageError"
    );


    if (!department.value) {

        setError(
            department,
            "departmentError",
            "Please select your department."
        );

        return false;
    }


    if (
        department.value ===
        "Regional Languages"
    ) {

        if (!regionalLanguage.value) {

            setError(
                regionalLanguage,
                "regionalLanguageError",
                "Please select your regional language."
            );

            return false;
        }


        if (
            regionalLanguage.value ===
            "Other" &&
            !customLanguage.value.trim()
        ) {

            setError(
                customLanguage,
                "customLanguageError",
                "Please enter the exact language."
            );

            return false;
        }

    }


    return true;
}


/* ======================================
   CATEGORY
====================================== */

function validateCategory() {

    clearError(
        category,
        "categoryError"
    );


    if (!category.value) {

        setError(
            category,
            "categoryError",
            "Please select a complaint category."
        );

        return false;
    }


    return true;
}


/* ======================================
   DESCRIPTION
====================================== */

description.addEventListener(
    "input",
    function () {

        if (this.value.length > 500) {

            this.value =
                this.value.slice(0, 500);

        }


        descriptionCounter.textContent =
            `${this.value.length}/500`;


        validateDescription();

    }
);


function countSymbols(text) {

    /*
       A symbol is anything other than:
       letters
       numbers
       spaces
    */

    const symbols =
        text.match(
            /[^A-Za-z0-9\s]/g
        );

    return symbols
        ? symbols.length
        : 0;

}


function validateDescription() {

    clearError(
        description,
        "descriptionError"
    );


    const text =
        description.value.trim();


    if (!text) {

        setError(
            description,
            "descriptionError",
            "Complaint description is required."
        );

        return false;
    }


    if (text.length > 500) {

        setError(
            description,
            "descriptionError",
            "Complaint description cannot exceed 500 characters."
        );

        return false;
    }


    const symbolCount =
        countSymbols(text);


    if (symbolCount > 2) {

        setError(
            description,
            "descriptionError",
            `Only 2 symbol characters are allowed. You currently have ${symbolCount}.`
        );

        return false;
    }


    return true;
}


/* ======================================
   CREATE COMPLAINT ID
====================================== */

function createComplaintId() {

    const random =
        Math.floor(
            100000 +
            Math.random() * 900000
        );

    return `CMP${random}`;

}


/* ======================================
   SUBMIT COMPLAINT
====================================== */

complaintForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const validName =
            validateStudentName();

        const validRegister =
            validateRegisterNumber();

        const validDepartment =
            validateDepartment();

        const validCategory =
            validateCategory();

        const validDescription =
            validateDescription();


        if (
            !validName ||
            !validRegister ||
            !validDepartment ||
            !validCategory ||
            !validDescription
        ) {

            showToast(
                "Please correct the highlighted fields.",
                "error"
            );

            return;
        }


        let language = "";


        if (
            department.value ===
            "Regional Languages"
        ) {

            if (
                regionalLanguage.value ===
                "Other"
            ) {

                language =
                    customLanguage.value.trim();

            } else {

                language =
                    regionalLanguage.value;

            }

        }


        const complaint = {

            id: createComplaintId(),

            studentName:
                studentName.value.trim(),

            registerNumber:
                registerNumber.value,

            department:
                department.value,

            language: language,

            category:
                category.value,

            description:
                description.value.trim(),

            status:
                "Pending",

            submittedAt:
                new Date().toLocaleString()

        };


        complaints.unshift(
            complaint
        );


        localStorage.setItem(
            "studentComplaints",
            JSON.stringify(complaints)
        );


        renderComplaints();

        updateStatistics();


        showToast(
            `Complaint submitted successfully. ID: ${complaint.id}`
        );


        /*
         Display ID so student can save it.
        */

        alert(
            "Complaint submitted successfully!\n\n" +
            "Your Complaint ID is:\n" +
            complaint.id +
            "\n\nPlease save this ID for tracking."
        );


        complaintForm.reset();


        languageGroup.classList.add(
            "hidden"
        );

        customLanguageGroup.classList.add(
            "hidden"
        );

        descriptionCounter.textContent =
            "0/500";

    }
);


/* ======================================
   DISPLAY COMPLAINTS
====================================== */

function renderComplaints() {

    if (complaints.length === 0) {

        complaintList.innerHTML = `
            <div class="empty-state">
                <div>📭</div>
                <h3>No complaints submitted</h3>
                <p>
                    New complaints will appear here.
                </p>
            </div>
        `;

        return;
    }


    complaintList.innerHTML =
        complaints
            .slice(0, 10)
            .map(
                complaint => {

                    const statusClass =
                        complaint.status ===
                        "Resolved"
                            ? "status-resolved"
                            : "status-pending";


                    return `
                        <article class="complaint-card">

                            <div>

                                <h3>
                                    ${escapeHTML(
                                        complaint.id
                                    )}
                                </h3>

                                <p>
                                    <strong>
                                        Student:
                                    </strong>

                                    ${escapeHTML(
                                        complaint.studentName
                                    )}
                                </p>

                                <p>
                                    <strong>
                                        Department:
                                    </strong>

                                    ${escapeHTML(
                                        complaint.department
                                    )}
                                </p>

                                ${
                                    complaint.language
                                    ? `
                                        <p>
                                            <strong>
                                                Language:
                                            </strong>

                                            ${escapeHTML(
                                                complaint.language
                                            )}
                                        </p>
                                    `
                                    : ""
                                }

                                <p>
                                    <strong>
                                        Category:
                                    </strong>

                                    ${escapeHTML(
                                        complaint.category
                                    )}
                                </p>

                                <p>
                                    ${escapeHTML(
                                        complaint.description
                                    )}
                                </p>

                                <p>
                                    <small>
                                        ${escapeHTML(
                                            complaint.submittedAt
                                        )}
                                    </small>
                                </p>

                            </div>

                            <span
                                class="status ${statusClass}"
                            >
                                ${escapeHTML(
                                    complaint.status
                                )}
                            </span>

                        </article>
                    `;

                }
            )
            .join("");

}


/* ======================================
   STATISTICS
====================================== */

function updateStatistics() {

    totalComplaints.textContent =
        complaints.length;


    pendingComplaints.textContent =
        complaints.filter(
            complaint =>
                complaint.status ===
                "Pending"
        ).length;


    resolvedComplaints.textContent =
        complaints.filter(
            complaint =>
                complaint.status ===
                "Resolved"
        ).length;

}


/* ======================================
   TRACK COMPLAINT
====================================== */

trackButton.addEventListener(
    "click",
    trackComplaint
);


complaintIdInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {
            trackComplaint();
        }

    }
);


function trackComplaint() {

    const id =
        complaintIdInput
            .value
            .trim()
            .toUpperCase();


    if (!id) {

        trackResult.innerHTML = `
            <div class="track-result-card">
                <p>
                    Please enter a complaint ID.
                </p>
            </div>
        `;

        return;
    }


    const complaint =
        complaints.find(
            item =>
                item.id.toUpperCase() === id
        );


    if (!complaint) {

        trackResult.innerHTML = `
            <div class="track-result-card">

                <h3>
                    Complaint Not Found
                </h3>

                <p>
                    No complaint was found with ID
                    <strong>
                        ${escapeHTML(id)}
                    </strong>.
                </p>

            </div>
        `;

        return;
    }


    trackResult.innerHTML = `
        <div class="track-result-card">

            <h3>
                ${escapeHTML(
                    complaint.id
                )}
            </h3>

            <p>
                <strong>
                    Student:
                </strong>

                ${escapeHTML(
                    complaint.studentName
                )}
            </p>

            <p>
                <strong>
                    Category:
                </strong>

                ${escapeHTML(
                    complaint.category
                )}
            </p>

            <p>
                <strong>
                    Department:
                </strong>

                ${escapeHTML(
                    complaint.department
                )}
            </p>

            <p>
                <strong>
                    Status:
                </strong>

                ${escapeHTML(
                    complaint.status
                )}
            </p>

            <p>
                <strong>
                    Submitted:
                </strong>

                ${escapeHTML(
                    complaint.submittedAt
                )}
            </p>

        </div>
    `;

}


/* ======================================
   LOGIN / SIGNUP MODALS
====================================== */

const loginModal =
    document.getElementById("loginModal");

const signupModal =
    document.getElementById("signupModal");

const openLogin =
    document.getElementById("openLogin");

const openSignup =
    document.getElementById("openSignup");

const switchToSignup =
    document.getElementById("switchToSignup");

const switchToLogin =
    document.getElementById("switchToLogin");


function openModal(modal) {

    modal.classList.remove("hidden");

    document.body.style.overflow =
        "hidden";

}


function closeModal(modal) {

    modal.classList.add("hidden");

    document.body.style.overflow =
        "";

}


openLogin.addEventListener(
    "click",
    () => openModal(loginModal)
);


openSignup.addEventListener(
    "click",
    () => openModal(signupModal)
);


switchToSignup.addEventListener(
    "click",
    () => {

        closeModal(loginModal);

        openModal(signupModal);

    }
);


switchToLogin.addEventListener(
    "click",
    () => {

        closeModal(signupModal);

        openModal(loginModal);

    }
);


document
    .querySelectorAll(".close-modal")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const modal =
                    document.getElementById(
                        this.dataset.close
                    );

                closeModal(modal);

            }
        );

    });


document
    .querySelectorAll(".modal")
    .forEach(modal => {

        modal.addEventListener(
            "click",
            function (event) {

                if (event.target === modal) {
                    closeModal(modal);
                }

            }
        );

    });


document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeModal(loginModal);

            closeModal(signupModal);

        }

    }
);


/* ======================================
   PASSWORD VISIBILITY
====================================== */

document
    .querySelectorAll(".password-toggle")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const input =
                    document.getElementById(
                        this.dataset.target
                    );


                if (
                    input.type ===
                    "password"
                ) {

                    input.type = "text";

                    this.textContent = "🙈";

                } else {

                    input.type =
                        "password";

                    this.textContent =
                        "👁";

                }

            }
        );

    });


/* ======================================
   PASSWORD RULES
====================================== */

const signupPassword =
    document.getElementById(
        "signupPassword"
    );


function validatePasswordRules(
    password
) {

    return {

        length:
            password.length >= 8,

        upper:
            /[A-Z]/.test(password),

        lower:
            /[a-z]/.test(password),

        number:
            /\d/.test(password),

        symbol:
            /[^A-Za-z0-9]/.test(
                password
            )

    };

}


signupPassword.addEventListener(
    "input",
    function () {

        const rules =
            validatePasswordRules(
                this.value
            );


        updatePasswordRule(
            "ruleLength",
            rules.length,
            "Minimum 8 characters"
        );

        updatePasswordRule(
            "ruleUpper",
            rules.upper,
            "One uppercase letter"
        );

        updatePasswordRule(
            "ruleLower",
            rules.lower,
            "One lowercase letter"
        );

        updatePasswordRule(
            "ruleNumber",
            rules.number,
            "One number"
        );

        updatePasswordRule(
            "ruleSymbol",
            rules.symbol,
            "One special character"
        );

    }
);


function updatePasswordRule(
    elementId,
    valid,
    text
) {

    const element =
        document.getElementById(
            elementId
        );


    if (valid) {

        element.textContent =
            `✓ ${text}`;

        element.classList.add(
            "valid"
        );

    } else {

        element.textContent =
            `○ ${text}`;

        element.classList.remove(
            "valid"
        );

    }

}


/* ======================================
   SIGNUP
====================================== */

const signupForm =
    document.getElementById(
        "signupForm"
    );


signupForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const name =
            document
                .getElementById(
                    "signupName"
                )
                .value
                .trim();


        const email =
            document
                .getElementById(
                    "signupEmail"
                )
                .value
                .trim()
                .toLowerCase();


        const password =
            signupPassword.value;


        const confirmPassword =
            document
                .getElementById(
                    "confirmPassword"
                )
                .value;


        const error =
            document.getElementById(
                "signupError"
            );


        error.textContent = "";


        if (!name || !email) {

            error.textContent =
                "Please complete all fields.";

            return;
        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        if (!emailPattern.test(email)) {

            error.textContent =
                "Enter a valid email address.";

            return;
        }


        const passwordRules =
            validatePasswordRules(
                password
            );


        const passwordValid =
            Object
                .values(passwordRules)
                .every(Boolean);


        if (!passwordValid) {

            error.textContent =
                "Password does not meet all security requirements.";

            return;
        }


        if (
            password !==
            confirmPassword
        ) {

            error.textContent =
                "Passwords do not match.";

            return;
        }


        const users =
            JSON.parse(
                localStorage.getItem(
                    "studentUsers"
                )
            ) || [];


        const existingUser =
            users.find(
                user =>
                    user.email === email
            );


        if (existingUser) {

            error.textContent =
                "An account already exists with this email.";

            return;
        }


        users.push({

            name: name,
            email: email,

            /*
             DEMO ONLY.

             Never store plain passwords
             like this in a real website.

             MongoDB backend should use bcrypt.
            */

            password: password

        });


        localStorage.setItem(
            "studentUsers",
            JSON.stringify(users)
        );


        showToast(
            "Account created successfully."
        );


        signupForm.reset();


        document
            .querySelectorAll(
                ".password-rules span"
            )
            .forEach(item => {

                item.classList.remove(
                    "valid"
                );

            });


        closeModal(signupModal);

        openModal(loginModal);

    }
);


/* ======================================
   LOGIN
====================================== */

const loginForm =
    document.getElementById(
        "loginForm"
    );


loginForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const email =
            document
                .getElementById(
                    "loginEmail"
                )
                .value
                .trim()
                .toLowerCase();


        const password =
            document
                .getElementById(
                    "loginPassword"
                )
                .value;


        const loginError =
            document.getElementById(
                "loginError"
            );


        loginError.textContent = "";


        const users =
            JSON.parse(
                localStorage.getItem(
                    "studentUsers"
                )
            ) || [];


        const user =
            users.find(
                account =>
                    account.email ===
                        email &&
                    account.password ===
                        password
            );


        if (!user) {

            loginError.textContent =
                "Incorrect email or password.";

            return;
        }


        const sessionUser = {

            name:
                user.name,

            email:
                user.email

        };


        localStorage.setItem(
            "currentStudentUser",
            JSON.stringify(
                sessionUser
            )
        );


        loginForm.reset();

        closeModal(loginModal);

        updateUserInterface();


        showToast(
            `Welcome, ${user.name}!`
        );

    }
);


/* ======================================
   USER SESSION
====================================== */

const authButtons =
    document.getElementById(
        "authButtons"
    );

const userArea =
    document.getElementById(
        "userArea"
    );

const welcomeUser =
    document.getElementById(
        "welcomeUser"
    );

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


function updateUserInterface() {

    const currentUser =
        JSON.parse(
            localStorage.getItem(
                "currentStudentUser"
            )
        );


    if (currentUser) {

        authButtons.classList.add(
            "hidden"
        );

        userArea.classList.remove(
            "hidden"
        );

        welcomeUser.textContent =
            `Hi, ${currentUser.name}`;

    } else {

        authButtons.classList.remove(
            "hidden"
        );

        userArea.classList.add(
            "hidden"
        );

    }

}


logoutBtn.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "currentStudentUser"
        );

        updateUserInterface();

        showToast(
            "You have been logged out."
        );

    }
);


/* ======================================
   MOBILE NAVIGATION
====================================== */

const menuBtn =
    document.getElementById("menuBtn");

const mainNav =
    document.getElementById("mainNav");


menuBtn.addEventListener(
    "click",
    function () {

        mainNav.classList.toggle(
            "show"
        );


        const expanded =
            mainNav.classList.contains(
                "show"
            );


        menuBtn.setAttribute(
            "aria-expanded",
            expanded
        );

    }
);


document
    .querySelectorAll(
        "#mainNav a"
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            function () {

                mainNav.classList.remove(
                    "show"
                );

                menuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


/* ======================================
   INITIAL LOAD
====================================== */

renderComplaints();

updateStatistics();

updateUserInterface();