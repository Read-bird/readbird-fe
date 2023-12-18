import {BtnKakaoLogin} from "@assets/images/BtnKakaoLogin";
import styled from "styled-components";
import {authFetch} from "@api/axios";
import {useNavigate} from "react-router-dom";
import {TLoginResType} from "@api/types";
import {setAccessToken} from "@/store/reducers";
import {useDispatch} from "react-redux";
import axios from "axios";

type TProps = {
    className: string
}

export const LoginBtn = (props:TProps) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const REACT_APP_SERVER_PATH: string | undefined = process.env.REACT_APP_SERVER_PATH;
    const REST_API_KEY: string | undefined = process.env.REACT_APP_KAKAO_API_KEY;
    const redirectUri: string = "http://localhost:3000/login/auth";
    const kakaoURL: string = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${redirectUri}&response_type=code`;

    const handleClick = () => {
        window.location.href = kakaoURL;
    }

    const handleClickGuest = async () => {
        try{
            const res = await axios.post<TLoginResType>(`${REACT_APP_SERVER_PATH}api/user/login-guest`);
            if(res.status === 200){
                const extractedToken = res.headers?.accesstoken?.replace("Bearer ", "");
                localStorage.setItem("rb-access-token", extractedToken);
                localStorage.setItem("rb-user-info", JSON.stringify(res.data));
                dispatch(setAccessToken(extractedToken));
                navigate("/");
            }
        }catch (err: any){
            alert(err.message);
            console.log(err)
            navigate("/login");
        }
    }

    return (
        <StyledBtn className={props.className}>
            <button type="button" onClick={handleClick}>
                <BtnKakaoLogin/>
            </button>
            <button type="button" className="guest-btn" onClick={handleClickGuest}>게스트 체험하기</button>
        </StyledBtn>
    )
}

const StyledBtn = styled.div`
  width: 100%;
  text-align: center;

  button {
    cursor: pointer;
  }
  button.guest-btn{
    margin-top: 20px;
    color: #ABABAB;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
    text-decoration-line: underline;
  }
`;