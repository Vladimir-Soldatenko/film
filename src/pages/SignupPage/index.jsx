import { useNavigate } from "react-router-dom";
import SignupForm from "pages/SignupPage/components/SignupForm";
import api from "api";

const SignupPage = ({ setMsg }) => {
  const navigate = useNavigate();

  const submit = (user) => {
    return api.users.create(user).then(() => {
      setMsg("user has created");
      navigate("/login");
    });
  };

  return (
    <div className="ui grid">
      <div className="eight wide column">
        <SignupForm submit={submit} />
      </div>
    </div>
  );
};

export default SignupPage;
