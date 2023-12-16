import {Controller, SetValueConfig, useForm} from "react-hook-form";
import styled from "styled-components";
import {InputLabel} from "@components/common/Form/InputLabel";
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {SelectLabel} from "@components/common/Form/SelectLabel";
import dayjs from "dayjs";
import {authFetch} from "@api/axios";

interface IRegisterForm {
    bookId: number | null;
    title: string | null;
    author: string | null;
    publisher: string | null
    totalPage: string | null;
    startPage: string;
    startDate: string;
    endDate: string;
}
type TProps = {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const RegisterModal = ({
                                  setIsOpen
}: TProps) => {
    const {
        register,
        control,
        handleSubmit: onSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<IRegisterForm>({
        mode: "onSubmit",
        defaultValues: {
            bookId: null,
            title: null,
            author: null,
            publisher: null,
            totalPage: null,
            startPage: "",
            startDate: "",
            endDate: ""
        },
    });

    const [yearOptions, setYearOptions] = useState<number[]>([]);
    const [monthOptions, setMonthOptions] = useState<(number | string)[]>([]);
    const [dayOptions, setDatOptions] = useState<(number | string)[]>([]);
    const [startYear, setStartYear] = useState<string>('');
    const [endYear, setEndYear] = useState<string>('');
    const [startMonth, setStartMonth] = useState<string>('');
    const [endMonth, setEndMonth] = useState<string>('');
    const [startDay, setStartDay] = useState<string>('');
    const [endDay, setEndDay] = useState<string>('');

    useEffect(() => {
        const generateYearOptions = () => {
            const currentYear = dayjs().year();
            const yearOptions = [];
            for (let year = currentYear; year <= currentYear + 50; year++) {
                yearOptions.push(year);
            }
            setYearOptions(yearOptions);
        };

        const generateMonthOptions = () => {
            const monthOptions = [];
            for (let month = 1; month <= 12; month++) {
                monthOptions.push(month < 10 ? `0${month}` : month);
            }
            setMonthOptions(monthOptions);
        };

        const generateDayOptions = () => {
            const dayOptions = [];
            for (let day = 1; day <= 31; day++) {
                dayOptions.push(day < 10 ? `0${day}` : day);
            }
            setDatOptions(dayOptions);
        };

        generateYearOptions();
        generateMonthOptions();
        generateDayOptions();
    }, []);

    const handleDateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        let contId = event.target.id;
        switch (contId){
            case "startDate-y":
                setStartYear(event.target.value);
                break;
            case "startDate-m":
                setStartMonth(event.target.value);
                break;
            case "startDate-d":
                setStartDay(event.target.value);
                break;
            case "endDate-y":
                setEndYear(event.target.value);
                break;
            case "endDate-m":
                setEndMonth(event.target.value);
                break;
            case "endDate-d":
                setEndDay(event.target.value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (data: IRegisterForm) => {
        const startDateForm = startYear ? `${startYear}-${startMonth}-${startDay}` : "";
        const endDateForm = endYear ? `${endYear}-${endMonth}-${endDay}` : "";
        setValue("startDate", startDateForm);
        setValue("endDate", endDateForm);

        try{
            const requestData = {

            }
            const res = await authFetch.post("", requestData);
        }catch (err){
            console.log(err);
        }

        console.log(data);
    };
    const handleClose = () => {
        setIsOpen(false);
    }

    return(
        <StyledForm onSubmit={onSubmit(handleSubmit)}>
            <InputLabel
                label={"책 이름"}
                type={"text"}
                id={"title"}
                placeholder={"데미안"}
                requiredText={"제목을 입력해주세요."}
                name={"title"}
            />
            <div className="cont flex">
                <InputLabel
                    label={"글쓴이"}
                    type={"text"}
                    id={"author"}
                    placeholder={"헤르만 헤세"}
                    name={"author"}
                />
                <InputLabel
                    label={"출판사"}
                    type={"text"}
                    id={"publisher"}
                    placeholder={"민음사"}
                    name={"publisher"}
                />
            </div>
            <div className="cont flex">
                <InputLabel
                    label={"총 쪽 수"}
                    type={"text"}
                    id={"totalPage"}
                    placeholder={"240"}
                    name={"totalPage"}
                />
                <InputLabel
                    label={"시작하는 쪽"}
                    type={"text"}
                    id={"startPage"}
                    placeholder={"120"}
                    name={"startPage"}
                />
            </div>
            <div className="cont">
                <label>목표 기간</label>
                <div className="cont select">
                    <SelectLabel
                        id={"startDate-y"}
                        placeholder={"2024"}
                        name={"startDate-y"}
                        options={yearOptions}
                        onChange={handleDateChange}
                    /><span>년</span>
                    <SelectLabel
                        id={"startDate-m"}
                        placeholder={"01"}
                        name={"startDate-m"}
                        options={monthOptions}
                        onChange={handleDateChange}
                    /><span>월</span>
                    <SelectLabel
                        id={"startDate-d"}
                        placeholder={"01"}
                        name={"startDate-d"}
                        options={dayOptions}
                        onChange={handleDateChange}
                    /><span>일 부터</span>
                </div>
                <div className="cont select">
                    <SelectLabel
                        id={"endDate-y"}
                        placeholder={"2024"}
                        name={"endDate-y"}
                        options={yearOptions}
                        onChange={handleDateChange}
                    /><span>년</span>
                    <SelectLabel
                        id={"endDate-m"}
                        placeholder={"01"}
                        name={"endDate-m"}
                        options={monthOptions}
                        onChange={handleDateChange}
                    /><span>월</span>
                    <SelectLabel
                        id={"endDate-d"}
                        placeholder={"01"}
                        name={"endDate-d"}
                        options={dayOptions}
                        onChange={handleDateChange}
                    /><span>일 까지</span>
                </div>
            </div>



            <div className="cont flex" style={{marginTop: "10px"}}>
                <button type="button" className="btn-1 btn" onClick={handleClose}>취소</button>
                <button type="submit" className="btn-2 btn" onClick={onSubmit(handleSubmit)}>확인</button>
            </div>
        </StyledForm>
    )
}

const StyledForm = styled.form`
  div.cont{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 17px;
    position: relative;
    &.flex{
      flex-direction: row;
      gap: 15px;
      margin-bottom: 0;
    }
    &.select{
      gap: 5px;
      flex-direction: row;
      align-items: center;
      span{
        color: #ABABAB;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px;
        letter-spacing: 0.16px;
      }
    }
  }
  label{
    color: #B780DB;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px;
    letter-spacing: 0.16px;
    margin-bottom: 8px;
    display: block;
  }
  input{
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ABABAB;
    background: #FFF;
    font-size: 16px;
    font-weight: 500;
    padding: 8px 15px;
    &::placeholder{
      color: #CFCFCF
    }
    &[name="title"]{
      padding: 8px 35px 8px 15px;
    }
  }
  .search-icon{
    position: absolute;
    right: 8px; bottom: 0;
    cursor: pointer;
    svg{
      width: 22px;
    }
  }

  select{
    display: block;
    width: 100%;
    border-radius: 10px;
    border: 1px solid #ABABAB;
    background: #FFF;
    font-size: 16px;
    font-weight: 500;
    padding: 8px;
    &::placeholder{
      color: #CFCFCF
    }
    &:nth-of-type(1){
      width: 98px;
    }
    &:nth-of-type(2){
      width: 60px;
    }
    &:nth-of-type(3){
      width: 60px;
    }
  }
  
  .btn{
    border-radius: 10px;
    padding: 12px 0;
    width: 100%;
    color: #FFF;
    text-align: center;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    cursor: pointer;
  }
  .btn-1{
    background: #CFCFCF;
  }
  .btn-2{
    background: #B780DB;
  }
`
