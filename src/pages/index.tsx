import Head from "next/head";
import { useState, useEffect } from "react";
import Input from "../Components/Input.jsx";
import LineChart from "../Components/LineChart.jsx";
import CollapsibleBox from "@/Components/CollapsibleBox.jsx";
import RelatedCalculator from "@/Components/RelatedCalculator.jsx";
import styles from "../styles/Home.module.css"

export default function Home() {
  const [totalInvestment, setTotalInvestment] = useState(100000);
  const [interestRate, setInterestRate] = useState(7);
  const [timePeriod, setTimePeriod] = useState(10);
  const [isLineChart, setCheck] = useState(true);
  const [graphPoints, setGraphPoints] = useState([107000, 114490, 122504, 131080, 140255, 150073, 160578, 171819, 183846,
    196715]);
  const [maturityValue, setMaturityValue] = useState(196716);
  const [estReturns, setEstReturns] = useState(96716);
  
  useEffect(() => {
    console.log('myValue changed to:', maturityValue);
    setMaturityValue(maturityValue);
    calculateGraphPoints();
  }, [maturityValue]);
  useEffect(() => {
    console.log('myValue changed to:', estReturns);
    setEstReturns(estReturns);
    calculateGraphPoints();
  }, [estReturns]);
  useEffect(() => {
    console.log('myValue changed to:', interestRate);
    setInterestRate(interestRate);
    calculateGraphPoints();
  }, [interestRate]);



  function calculate()  {
    calculateGraphPoints();
    // let cumulativeAmount: number = Number(totalInvestment);
    // for (let i = 1; i <= timePeriod; i++) {
    //   cumulativeAmount += (cumulativeAmount * interestRate) / 100;
    // }
    let cumulativeAmount: number = totalInvestment * Math.pow(1 + interestRate/100, 12*timePeriod);
    // setMaturityValue(totalInvestment * Math.pow(1 + interestRate, timePeriod));
    setEstReturns(Math.ceil(maturityValue - totalInvestment));
    setMaturityValue(Math.ceil(cumulativeAmount));
    setEstReturns(Math.ceil(maturityValue - totalInvestment));
    calculateGraphPoints();
  }
  
  function calculateGraphPoints()  {
    let points: number[] = [];
    let cumulativeAmount: number = Number(totalInvestment);
    for (let i = 1; i <= timePeriod; i++) {
      points.push(cumulativeAmount); //[100000, 107000, 114490]
      cumulativeAmount += Math.ceil((cumulativeAmount * interestRate) / 100);
    }
    points.push(cumulativeAmount);
    // setEstReturns(cumulativeAmount - totalInvestment);
    setGraphPoints(points);
  }
  

  return (
    <>
      <Head>
        <title>RD Calculator</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com"  />
        <link rel="stylesheet" as="font" data-href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&amp;family=Rubik:wght@400;500;600&amp;display=swap" />
        <link href="/dist/output.css" rel="stylesheet" />
        <link rel="icon" href='./logo.png' />
      </Head>


      <main
        className={
         ` ${styles.main} ${"relative [@media(max-width:1200px)]:p-5 [@media(min-width:1200px)]:p-20 w-full overflow-x-hidden flex-col justify-between text-neutral-700 "}`
        }
      >
        <div>
          <div
            className={
              "text-zinc-900 text-5xl font-semibold text-center leading-tight [@media(max-width:300px)]:text-3xl"
            }
          >
            <span className={"text-blue-600"}>RD</span>{" "}
            Calculator
          </div>
          <p className={"text-neutral-700 mt-3 [@media(min-width:200px)]:text-md [@media(max-width:300px)]:text-sm lg:text-lg text-center  "}>
          RD stands for Recurring Deposit. It is a type of savings account where the depositor makes regular fixed deposits over a specified period of time, usually ranging from 6 months to 10 years. The depositor is required to make a fixed deposit each month, and in return, the bank pays a higher interest rate on the deposit as compared to a regular savings account.
          </p>
        </div>

        <div
          className={
            "flex w-full xl:max-h-[403px] lg:max-h-[516px] mt-[50px] [@media(min-width:200px)]:gap-4 lg:justify-between [@media(max-width:1000px)]:flex-col md:flex-col lg:flex-row  "
          }
        >
          <div
            className={
              "flex [@media(max-width:1000px)]:flex-col flex-row [@media(min-width:200px)]:gap-10 p-[30px] [@media(max-width:1000px)]:w-[100%] lg:w-[75%] border-2 border-white rounded-[30px] shadow-md shadow-[#505C6227] bg-white bg-opacity-40 backdrop-blur-[30px] "
            }
          >
            
            <div className={"text-left text-lg [@media(max-width:1000px)]:w-[100%] w-[50%] "}>
           
              <div
                className={
                  "flex flex-col font-medium space-y-[20px]"
                }
              >
               
                <div>
                
                  <div>Total investment</div>
                  <Input
                    id='totalInvestment'
                    type='rupees'
                    value={totalInvestment}
                    setValue={setTotalInvestment}
                    min={1000}
                    max={10000000}
                    step={100}
                  />
                </div>

                <div>
                <div>Interest rate</div>
                  <Input
                    id='interestRate'
                    type="percentage"
                    value={interestRate}
                    setValue={setInterestRate}
                    min={1}
                    max={15}
                    step={0.1}
                  />
                </div>

                <div>
                <div>Time Period (Yrs)</div>
                  <Input
                    id='timePeriod'
                    value={timePeriod}
                    setValue={setTimePeriod}
                    min={1}
                    max={25}
                  />
                </div>
              </div>

              <div
                className={
                  "flex flex-warp justify-center mt-[40px] cursor-pointer "
                }
              >
                <div
                  className={
                    " border-[0.1rem] border-dashed border-[#36b366] p-[4px] rounded-[35px] w-[65%]"
                  }
                >
                  <div
                    className={ 
                      "text-center text-white font-semibold rounded-[35px] p-[0.3rem] shadow-lg shadow-[#36b3665d] bg-[#00d382]"
                    }
                    onClick={calculate}
                  >
                    Calculate
                  </div>
                </div>
              </div>
            </div>

            {/* Line */}
            <div
              className={
                " -my-4 -mx-2 [@media(max-width:1000px)]:-mx-2  [@media(max-width:1000px)]:h-0 [@media(max-width:1000px)]:w-auto lg:h-auto lg:w-0 rounded-[50px] border-2 border-solid border-[#7070701A]"
              }
            ></div>

            {/* Chart */}
            <div className={"[@media(max-width:1000px)]:w-[100%] lg:w-[50%]"}>

              {/* Charts/Graph */}
              <div className={" relative object-right-top [@media(min-width:200px)]:h-auto md:w-[100%]"}> 
                <LineChart points={graphPoints} />
              </div>

              
              <div className={"flex-col "}>
               
                <div className={"flex justify-between gap-2  font-medium mb-3 min-w-[230px] [@media(max-width:300px)]:flex-col "}>
                  <div className={"[@media(max-width:300px)]:w-[170px] [@media(max-width:300px)]:text-center"} id="RD_output">Total Investment</div>
                  <div className={"font-bold [@media(max-width:300px)]:w-[170px] [@media(max-width:300px)]:text-center"}>{`${'\u20B9'} ${totalInvestment.toLocaleString("en-In")}`}</div>
                </div>
                <div className={"flex justify-between gap-2 font-medium mb-3 min-w-[230px] [@media(max-width:300px)]:flex-col [@media(max-width:300px)]:pl-[20px]"}>
                  <div className={"[@media(max-width:300px)]:w-[130px] [@media(max-width:300px)]:text-center"} id="absoluteReturns">Estimated returns</div>
                  <div className={"font-bold [@media(max-width:300px)]:w-[130px] [@media(max-width:300px)]:text-center"}>{`${'\u20B9'} ${estReturns.toLocaleString("en-In")}`}</div>
                </div>
                <div className={"flex justify-between gap-2 font-medium mb-3 min-w-[230px] [@media(max-width:300px)]:flex-col [@media(max-width:300px)]:pl-[20px]"}>
                  <div className={"[@media(max-width:300px)]:w-[130px] [@media(max-width:300px)]:text-center"} id="absoluteReturns">Maturity Value</div>
                  <div className={"font-bold [@media(max-width:300px)]:w-[130px] [@media(max-width:300px)]:text-center"}>{`${'\u20B9'} ${maturityValue.toLocaleString("en-In")}`}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div
            className={
              " [@media(max-width:1000px)]:w-[100%] lg:w-[23%] lg:max-h-[516px] xl:max-h-[403px] px-[20px] py-[22px] [@media(max-width:1000px)]:mt-[20px] lg:mt-0 border-2 border-white rounded-[30px] shadow-md shadow-[#505C6227] bg-white bg-opacity-40 backdrop-blur-[30px] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
            }
          >
            <div className={"font-bold "}>How to use this calculator?</div>
            <CollapsibleBox
              heading={'Recurring  Deposit'}
              content={'It is a type of savings account where the depositor makes regular fixed deposits over a specified period of time. The interest rate offered on recurring deposits is generally higher than that offered on savings accounts but lower than the interest rate offered on fixed deposits.'}
              isSidePanel={true}
            />
            <CollapsibleBox
              heading={'Find out how much I can earn with RD'}
              content={'You can use the FundsIndia RD calculator to calculate your RD returns in a matter of seconds.'}
              isSidePanel={true}
            />
            <CollapsibleBox
              heading={'Tax Implications on RD'}
              content={'The interest earned on a Recurring Deposit (RD) is taxable. The rate of tax depends on the individual\'s tax slab.'}
              isSidePanel={true}
            />
            <CollapsibleBox
              heading={'Premature withdrawal implications'}
              content={'Premature withdrawal leads to loss of interest and a penalty will be imposed. The penalty rate varies from partner to partner.'}
              isSidePanel={true}
              isLast ={true}
            />
          </div>
        </div>

        {/* FAQ Panel */}
        <div
          className={
            " px-[25px] py-[10px] mt-[40px] border-2 border-white rounded-[30px] shadow-md shadow-[#505C6227] bg-white bg-opacity-40 backdrop-blur-[30px]"
          }
        >
          <CollapsibleBox
            heading={'What is Recurring  Deposit?'}
            headingBold = {true}
            content={' It is a type of savings account where the depositor makes regular fixed deposits over a specified period of time, usually ranging from 6 months to 10 years. The depositor is required to make a fixed deposit each month, and in return, the bank pays a higher interest rate on the deposit as compared to a regular savings account. The interest rate offered on recurring deposits is generally higher than that offered on savings accounts but lower than the interest rate offered on fixed deposits.            '}
          />

          <CollapsibleBox
            heading={'What is the lock-in period of RD investment?            '}
            headingBold = {true}
            content={'The lock-in period of an RD is usually the same as the deposit period, which can range from 6 months to 10 years.'}
          />

          <CollapsibleBox
            heading={'What is the minimum investment to book an RD?'}
            headingBold = {true}
            content={'The minimum investment of FDs  varies from one partner to another. It starts from 5000 rupees.'}
          />

          <CollapsibleBox
            heading={'What are the tax implications of an RD investment?'}
            headingBold = {true}
            content={'The interest earned on a Recurring Deposit (RD) is taxable. The rate of tax depends on the individual\'s tax slab, and the interest earned is added to the individual\'s total taxable income. Additionally, TDS (Tax Deducted at Source) is applicable on RD interest if the interest earned in a financial year is more than INR 40,000 for an individual or INR 50,000 for a Hindu Undivided Family (HUF). In such cases, TDS will be deducted at the rate of 10% before crediting the interest to the account.'}
          />

          <CollapsibleBox
            heading={'How can you use the RD calculator?'}
            headingBold = {true}
            content={'This calculator is very intuitive as it only takes the amount you are investing, the tenure and interest rate and can give you the earnings at the time of maturity and also year on year growth via a graph.            '}
          />
          <CollapsibleBox
            heading={'How does the PPF calculator work?'}
            headingBold = {true}
            content={
                "It uses the following logic A = P x (1 + r/100)^nt Where, A = Total amount by the end of the period P = Principal amount from which compounding will start r = Annual rate of interest n = number of times the interest compounds in a year t = number of years"                
            }
          />

          <CollapsibleBox
            heading={'What happens if I break my RD?'}
            headingBold = {true}
            content={
              "Breaking of RD is withdrawing the deposit before maturity. This is not advisable as it leads to loss of interest and a penalty will be imposed. The penalty rate varies from partner to partner. Please read all documents carefully before investing."}
              isLast={true}
          />
        </div>

        {/* Related Calculators */}
        <div className={"my-[30px] "}>
          <div className={"font-bold mb-[14px] text-[#464143]"}>
            Related Calculators
          </div>

          <div className={"no-scrollbar overflow-x-auto flex -mx-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"}>
            <RelatedCalculator
              name={"SWP Calculator"}
              path={"#"}
              first={true}
            />

            <RelatedCalculator name={"SWP Calculator"} path={"#"} />

            <RelatedCalculator name={"SWP Calculator"} path={"#"} />

            <RelatedCalculator name={"SWP Calculator"} path={"#"} />

            <RelatedCalculator name={"SWP Calculator"} path={"#"} />

            <RelatedCalculator name={"SWP Calculator"} path={"#"} />

            <RelatedCalculator name={"SWP Calculator"} path={"#"} />

            <RelatedCalculator name={"SWP Calculator"} path={"#"} />

            <RelatedCalculator name={"SWP Calculator"} path={"#"} />

            <RelatedCalculator name={"SWP Calculator"} path={"#"} />
          </div>
        </div>
      </main>
    </>
  );
}
