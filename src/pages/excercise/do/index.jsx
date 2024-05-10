import { Collapse, Input, Alert } from "antd";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
const { TextArea } = Input;

const DoingExcercisePage = ({ marking }) => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0 15px 0",
        }}
      >
        {!marking && (
          <CountdownCircleTimer
            size={120}
            isPlaying
            duration={10}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[7, 5, 2, 0]}
            strokeWidth={10}
            onComplete={() => console.log("v")}
            strokeLinecap="square"
          >
            {({ remainingTime }) => {
              const minutes = Math.floor(remainingTime / 60);
              const seconds = remainingTime % 60;
              return <h1>{`${minutes}:${seconds}`}</h1>;
            }}
          </CountdownCircleTimer>
        )}
      </div>
      <div style={{ maxHeight: "83vh", overflowY: "scroll" }}>
        <Collapse
          items={[
            {
              key: "1",
              label: "123",
              children: (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "20px",
                  }}
                >
                  <div className="row">
                    <div className="col-xs-12">
                      <div className="mcq">
                        <h4 style={{ marginBottom: "10px" }}>
                          <span lang="en">Multiple choice question</span>
                          <span lang="cy">Cwestiwn aml-ddewis</span>
                        </h4>
                        <label className="mcq-answer correct">
                          {/* <label className="mcq-answer"> */}
                          <input type="radio" name="question1" id="answer1" />
                          <div className="highlight"></div>
                          <div className="circle"></div>
                          <p>
                            <span lang="en">Correct Answer</span>
                            <span lang="cy">Welsh Correct Answer</span>
                          </p>
                          {/* FEEDBACK */}
                          <span className="feedback">
                            <span lang="en">Correct answer</span>
                          </span>
                        </label>
                        <label className="mcq-answer">
                          <input type="radio" name="question1" id="answer1" />
                          <div className="highlight"></div>
                          <div className="circle"></div>
                          <p>
                            <span lang="en">Incorrect Answer 1</span>
                            <span lang="cy">Welsh Incorrect Answer 1</span>
                          </p>
                          <span className="feedback">
                            <span lang="en">Incorrect</span>
                            <span lang="cy">Anghywir</span>
                          </span>
                        </label>
                        <label className="mcq-answer">
                          <input type="radio" name="question1" id="answer1" />
                          <div className="highlight"></div>
                          <div className="circle"></div>
                          <p>
                            <span lang="en">Incorrect Answer 2</span>
                            <span lang="cy">Welsh Incorrect Answer 2</span>
                          </p>
                          <span className="feedback">
                            <span lang="en">Incorrect</span>
                            <span lang="cy">Anghywir</span>
                          </span>
                        </label>
                        <label className="mcq-answer">
                          <input type="radio" name="question1" id="answer1" />
                          <div className="highlight"></div>
                          <div className="circle"></div>
                          <p>
                            <span lang="en">Incorrect Answer 3</span>
                            <span lang="cy">Welsh Incorrect Answer 3</span>
                          </p>
                          <span className="feedback">
                            <span lang="en">Incorrect</span>
                            <span lang="cy">Anghywir</span>
                          </span>
                        </label>
                        <Alert
                          message="Success Text"
                          type="success"
                          style={{ marginTop: "15px" }}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    style={{
                      border: "1px solid #DCDCDC",
                      padding: "15px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "15px",
                    }}
                  >
                    <h5>Score:</h5>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      <Input style={{ width: "60px" }} />
                      <span>/</span>
                      <span>10 </span>
                    </div>
                    <h5>Comments:</h5>
                    <TextArea
                      placeholder="Autosize height with minimum and maximum number of lines"
                      autoSize={{
                        minRows: 4,
                        maxRows: 6,
                      }}
                    />
                  </div>
                </div>
              ),
            },
          ]}
          defaultActiveKey={["1"]}
          onChange={onChange}
          style={{ margin: "20px 70px" }}
        />
        <Collapse
          items={[
            {
              key: "1",
              label: "123",
              children: (
                <div className="row">
                  <div className="col-xs-12">
                    <div className="mcq">
                      <h4 style={{ marginBottom: "10px" }}>
                        <span lang="en">Multiple choice question</span>
                        <span lang="cy">Cwestiwn aml-ddewis</span>
                      </h4>
                      <label className="mcq-answer correct">
                        {/* <label className="mcq-answer"> */}
                        <input type="radio" name="question1" id="answer1" />
                        <div className="highlight"></div>
                        <div className="circle"></div>
                        <p>
                          <span lang="en">Correct Answer</span>
                          <span lang="cy">Welsh Correct Answer</span>
                        </p>
                        {/* FEEDBACK */}
                        <span className="feedback">
                          <span lang="en">Correct answer</span>
                        </span>
                      </label>

                      <label className="mcq-answer">
                        <input type="radio" name="question1" id="answer1" />
                        <div className="highlight"></div>
                        <div className="circle"></div>
                        <p>
                          <span lang="en">Incorrect Answer 1</span>
                          <span lang="cy">Welsh Incorrect Answer 1</span>
                        </p>
                        <span className="feedback">
                          <span lang="en">Incorrect</span>
                          <span lang="cy">Anghywir</span>
                        </span>
                      </label>
                      <label className="mcq-answer">
                        <input type="radio" name="question1" id="answer1" />
                        <div className="highlight"></div>
                        <div className="circle"></div>
                        <p>
                          <span lang="en">Incorrect Answer 2</span>
                          <span lang="cy">Welsh Incorrect Answer 2</span>
                        </p>
                        <span className="feedback">
                          <span lang="en">Incorrect</span>
                          <span lang="cy">Anghywir</span>
                        </span>
                      </label>
                      <label className="mcq-answer">
                        <input type="radio" name="question1" id="answer1" />
                        <div className="highlight"></div>
                        <div className="circle"></div>
                        <p>
                          <span lang="en">Incorrect Answer 3</span>
                          <span lang="cy">Welsh Incorrect Answer 3</span>
                        </p>
                        <span className="feedback">
                          <span lang="en">Incorrect</span>
                          <span lang="cy">Anghywir</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
          defaultActiveKey={["1"]}
          onChange={onChange}
          style={{ margin: "20px 70px" }}
        />
        <Collapse
          items={[
            {
              key: "1",
              label: "123",
              children: (
                <div className="row">
                  <div className="col-xs-12">
                    <div className="mcq">
                      <h4 style={{ marginBottom: "10px" }}>
                        <span lang="en">Multiple choice question</span>
                        <span lang="cy">Cwestiwn aml-ddewis</span>
                      </h4>
                      <label className="mcq-answer correct">
                        {/* <label className="mcq-answer"> */}
                        <input type="radio" name="question1" id="answer1" />
                        <div className="highlight"></div>
                        <div className="circle"></div>
                        <p>
                          <span lang="en">Correct Answer</span>
                          <span lang="cy">Welsh Correct Answer</span>
                        </p>
                        {/* FEEDBACK */}
                        <span className="feedback">
                          <span lang="en">Correct answer</span>
                        </span>
                      </label>

                      <label className="mcq-answer">
                        <input type="radio" name="question1" id="answer1" />
                        <div className="highlight"></div>
                        <div className="circle"></div>
                        <p>
                          <span lang="en">Incorrect Answer 1</span>
                          <span lang="cy">Welsh Incorrect Answer 1</span>
                        </p>
                        <span className="feedback">
                          <span lang="en">Incorrect</span>
                          <span lang="cy">Anghywir</span>
                        </span>
                      </label>
                      <label className="mcq-answer">
                        <input type="radio" name="question1" id="answer1" />
                        <div className="highlight"></div>
                        <div className="circle"></div>
                        <p>
                          <span lang="en">Incorrect Answer 2</span>
                          <span lang="cy">Welsh Incorrect Answer 2</span>
                        </p>
                        <span className="feedback">
                          <span lang="en">Incorrect</span>
                          <span lang="cy">Anghywir</span>
                        </span>
                      </label>
                      <label className="mcq-answer">
                        <input type="radio" name="question1" id="answer1" />
                        <div className="highlight"></div>
                        <div className="circle"></div>
                        <p>
                          <span lang="en">Incorrect Answer 3</span>
                          <span lang="cy">Welsh Incorrect Answer 3</span>
                        </p>
                        <span className="feedback">
                          <span lang="en">Incorrect</span>
                          <span lang="cy">Anghywir</span>
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
          defaultActiveKey={["1"]}
          onChange={onChange}
          style={{ margin: "20px 70px" }}
        />
      </div>
    </>
  );
};

export default DoingExcercisePage;
