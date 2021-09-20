const passValidate = (password, confirmpassword) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:

  if (re.test(password) && password === confirmpassword) {
    return true;
  } else {
    alert(
      "Your password should include a lowercase letter, an uppercase letter and a number."
    );
    return false;
  }
};
