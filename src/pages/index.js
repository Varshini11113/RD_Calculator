import Head from "next/head";
import { useState, useEffect } from "react";
import Input from "../Components/Input.js";
import LineChart from "../Components/LineChart.js";
import CollapsibleBox from "../Components/CollapsibleBox.js";
import RelatedCalculator from "../Components/RelatedCalculator.js";

export default function Home() {
  const [totalInvestment, setTotalInvestment] = useState(100000);
  const [dummyTotalInvestment, setDummyTotalInvestment] = useState(1000000);
  const [interestRate, setInterestRate] = useState(7);
  const [timePeriod, setTimePeriod] = useState(10);
  const [graphPoints, setGraphPoints] = useState([1246241, 2582035, 4013819, 5548489, 7193439, 8956593, 10846447, 12872103, 15043320, 17370560]);
  const [maturityValue, setMaturityValue] = useState(17370560);
  const [estReturns, setEstReturns] = useState(99596);

  
  // useEffect(() => {
  //   console.log('mat val changed to:', maturityValue);
  //   setEstReturns(Number(maturityValue - totalInvestment));
  //   calculateGraphPoints();
  // }, [maturityValue]);

  useEffect(() => {
    console.log('est val changed to:', estReturns);
    calculateGraphPoints();
  }, [estReturns]);

  function calculate()  {
    let cumulativeTotalInvestment = totalInvestment* timePeriod * 12;
    // for (let i = 1; i <= timePeriod; i++) {
    //   cumulativeAmount =  (totalInvestment * ((1 + interestRate / 400) * (i*4) - 1)) / (1 - (1 + interestRate / 400) * (-1 / 3));
    //   console.log(cumulativeAmount);
    // }
    let interestQuarterly=0;
    let totalAmount=totalInvestment;
    for(let i=1;i<=timePeriod*12;i++){
      interestQuarterly+=(totalAmount*(1/12)*interestRate)/100;
      if(i%3==0){
        totalAmount+=interestQuarterly;
        interestQuarterly=0;
      }
      totalAmount+=totalInvestment;
    }
    totalAmount-=totalInvestment
    setDummyTotalInvestment(cumulativeTotalInvestment);
    setEstReturns((Math.round(totalAmount - cumulativeTotalInvestment)));
    setMaturityValue(Math.round(totalAmount));
    calculateGraphPoints();
  }
  

  function calculateGraphPoints()  {
    let points = [];
    let interestQuarterly=0;
    let totalAmount=totalInvestment;

    for(let i=1;i<=timePeriod*12;i++){
      
      interestQuarterly+=(totalAmount*(1/12)*interestRate)/100;
      if(i%3==0){
        totalAmount+=interestQuarterly;
        interestQuarterly=0;
      }
      if(i%12==0){
        points.push(totalAmount);
      }
      totalAmount+=totalInvestment;
    }
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

      <div
        className={
          "bg-bg_image w-full h-full bg-center bg-cover object-cover fixed"
        }
      />
      
      <main
        className={
          "relative font-['Poppins'] text-[14px] [@media(max-width:1200px)]:p-5 [@media(min-width:1200px)]:p-20 w-full overflow-x-hidden flex-col justify-between text-[#464143] "
        }
      >
        <div className="app-bg-container overflow-hidden">
        <div className="mt-[5rem]">
          <div
            className={
              "text-[#000000] font-semibold text-[36px] text-center"
            }
          >
            <span className={"text-[#0161FF] font-semibold text-[36px] "}>RD</span>{" "}
            Calculator
          </div>
          <p className={" mt-[10px] text-center leading-28"}>
           {/* leading 18 ensures line spacing of 18px because leading includes the height of characters too  */}

          {/* <p className={"text-neutral-700 mt-3 [@media(min-width:200px)]:text-md [@media(max-width:300px)]:text-sm lg:text-lg text-center  "}> */}
          RD stands for Recurring Deposit. It is a type of savings account where the depositor makes regular fixed deposits over a specified period of time, usually ranging from 6 months to 10 years. The depositor is required to make a fixed deposit each month, and in return, the bank pays a higher interest rate on the deposit as compared to a regular savings account.
          </p>
        </div>

        <div
          className={
            "flex w-full lg:max-h-[382.02px] mt-[50px] [@media(max-width:1000px)]:mt-[30px] [@media(min-width:200px)]:gap-4 lg:justify-between [@media(max-width:1000px)]:flex-col md:flex-col lg:flex-row  "
          }
        >
          <div
            className={
              "flex w-[50%] [@media(max-width:1000px)]:flex-col flex-row [@media(min-width:200px)]:gap-10 p-[30px] [@media(max-width:1000px)]:pb-[0px] [@media(max-width:1000px)]:w-[100%] lg:w-[75%] border-2 border-white rounded-[30px] shadow-md shadow-[#505C6227] bg-white bg-opacity-40 backdrop-blur-[30px] "
            }
          >
            
            <div className={"text-left [@media(max-width:1000px)]:w-[100%] w-[50%] "}>
           
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
                    "flex justify-center items-center border-[1px] border-dashed border-[#00D382]  rounded-[35px] p-[4px] w-[250px] h-[56px] [@media(max-width:500px)]:w-[228px] [@media(max-width:500px)]:h-[54px] [@media(max-width:500px)]:p-[0px]"
                  }
                >
                  <div
                    className={ 
                      "flex justify-center items-center text-white font-semibold rounded-[35px] top-[612px] left-[260px] shadow-lg shadow-[#36b3665d] bg-[#00d382] w-[100%] h-[100%] text-[18px] [@media(max-width:500px)]:w-[220px] [@media(max-width:500px)]:h-[46px]"
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
                " -my-4 -mx-2 [@media(max-width:1000px)]:-mx-2  [@media(max-width:1000px)]:h-0 [@media(max-width:1000px)]:w-auto lg:h-auto lg:w-0 rounded-[50px] border-[1px] border-solid border-[#707070] opacity-10"
              }
            ></div>

            {/* Total Chart Container*/}
            <div className={"[@media(max-width:1000px)]:w-[100%] lg:w-[50%]"}>

              {/* Charts/Graph */}
              <div className={" relative object-right-top [@media(min-width:200px)]:h-auto md:w-[100%]"}>
                    <LineChart key='' points={graphPoints} />
              </div>

              
              <div className={"flex-col text-[#464143] [@media(max-width:500px)]:mx-[15px] [@media(max-width:500px)]:my-[20px]"}>
               
                <div className={"flex justify-between gap-2  font-medium mb-3 min-w-[230px] [@media(max-width:300px)]:flex-col"}>
                  <div className={"[@media(max-width:300px)]:w-[170px] [@media(max-width:300px)]:text-center "} id="RD_output">Total Investment</div>
                  <div className={"font-bold [@media(max-width:300px)]:w-[170px] [@media(max-width:300px)]:text-center text-[#1B1C20]"}>{`${'\u20B9'} ${dummyTotalInvestment.toLocaleString("en-In")}`}</div>
                </div>
                <div className={"flex justify-between gap-2 font-medium mb-3 min-w-[230px] [@media(max-width:300px)]:flex-col [@media(max-width:300px)]:pl-[20px]"}>
                  <div className={"[@media(max-width:300px)]:w-[130px] [@media(max-width:300px)]:text-center"} id="absoluteReturns">Estimated returns</div>
                  <div className={"font-bold [@media(max-width:300px)]:w-[130px] [@media(max-width:300px)]:text-center text-[#1B1C20]"}>{`${'\u20B9'} ${estReturns.toLocaleString("en-In")}`}</div>
                </div>
                <div className={"flex justify-between gap-2 font-medium mb-3 min-w-[230px] [@media(max-width:300px)]:flex-col [@media(max-width:300px)]:pl-[20px]"}>
                  <div className={"[@media(max-width:300px)]:w-[130px] [@media(max-width:300px)]:text-center"} id="absoluteReturns">Maturity Value</div>
                  <div className={"font-bold [@media(max-width:300px)]:w-[130px] [@media(max-width:300px)]:text-center text-[#1B1C20]"}>{`${'\u20B9'} ${maturityValue.toLocaleString("en-In")}`}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div
            className={
              " w-[30%] [@media(max-width:1000px)]:w-[100%] lg:w-[23%] max-h-['inherit'] px-[20px] py-[22px] [@media(max-width:1000px)]:px-[15px] [@media(max-width:1000px)]:py-[20px] [@media(max-width:1000px)]:mt-[20px] lg:mt-0 border-2 border-white rounded-[30px] shadow-md shadow-[#505C6227] bg-white bg-opacity-40 backdrop-blur-[30px] overflow-y-scroll"
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
            " px-[25px] py-[10px] mt-[30px] border-2 border-white rounded-[30px] shadow-md shadow-[#505C6227] bg-white bg-opacity-40 backdrop-blur-[30px]"
          }
        >
          <CollapsibleBox
            heading={'What is Recurring  Deposit?'}
            content={'It is a type of savings account where the depositor makes regular fixed deposits over a specified period of time, usually ranging from 6 months to 10 years. The depositor is required to make a fixed deposit each month, and in return, the bank pays a higher interest rate on the deposit as compared to a regular savings account. The interest rate offered on recurring deposits is generally higher than that offered on savings accounts but lower than the interest rate offered on fixed deposits.'}
          />

          <CollapsibleBox
            heading={'What is the lock-in period of RD investment?'}
            content={'The lock-in period of an RD is usually the same as the deposit period, which can range from 6 months to 10 years. '}
          />

          <CollapsibleBox
            heading={'What is the minimum investment to book an RD?'}
            content={'The minimum investment of FDs  varies from one partner to another. It starts from 5000 rupees.'}
          />

          <CollapsibleBox
            heading={'What are the tax implications of an RD investment?'}
            content={'The interest earned on a Recurring Deposit (RD) is taxable. The rate of tax depends on the individual\'s tax slab, and the interest earned is added to the individual\'s total taxable income. Additionally, TDS (Tax Deducted at Source) is applicable on RD interest if the interest earned in a financial year is more than INR 40,000 for an individual or INR 50,000 for a Hindu Undivided Family (HUF). In such cases, TDS will be deducted at the rate of 10% before crediting the interest to the account.'}
          />

          <CollapsibleBox
            heading={'How can you use the RD calculator?'}
            content={'This calculator is very intuitive as it only takes the amount you are investing, the tenure and interest rate and can give you the earnings at the time of maturity and also year on year growth via a graph.'}
          />
          <CollapsibleBox
            heading={'How does the RD calculator work?'}
            isFormula={true}
          />

          <CollapsibleBox
            heading={'What happens if I break my RD?'}
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

        </div>
      </main>
    </>
  );
}
