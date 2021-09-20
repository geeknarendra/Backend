const emailValidate = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (re.test(email)) {
    return true;
  } else {
    alert("You have entered an invalid email address!");
    return false;
  }
};
