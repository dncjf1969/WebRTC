import React, {Component} from 'react';

function getNumbers() {
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for (let i = 0; i < 4; i += 1) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9-i)), 1)[0];
    array.push(chosen)
  }
  return array;
}

class NumberBaseball extends Component {
  constructor(props) {
    super(props);
    this.state= {
      result: '',
      value: '',
      answer: getNumbers(), // ex: [1,3,5,7]
      tries: [],
    };
  this.onSubmitForm = this.onSubmitForm.bind(this);
  this.onChangeInput = this.onChangeInput.bind(this);
  };
};

onSubmitForm = (e) {
  e.preventDefault();
  if (this.state.value === this.state.answer.join('')) {
    this.setState( {
      result: '홈런',
      tries: [...this.state.tries, {try: this.state.value, result:'홈런'}]
    })
  } else {
    const answerArray = this.state.value.split('').map( (v) => parseInt(v));
    let strike = 0;
    let ball = 0;
    if (this.state.treise.length >= 9) { // 10번 이상 틀렸을 때
      this.setState( {
        result: '10번 넘게 틀려서 실패!',
      });
      alert('게임을 다시 시작합니다!');
      this.setState( {
        value: '',
        ansewer: getNumbers,
        tries: [],
      }),
    } else {
      for (let i = 0; i<4; i+=1) {
        if (answerArray[i] === this.state.answer[i]) {
          strike += 1;
        } else if (this.state.answer.includes(answerArray[i])) {
          ball += 1;
        }
      }
      this.setState( {
        tries: [...this.state.tries, {try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
        value:'',
      });
    }
  }
};

onChangeInput = () => {
  this.setState( () {
    value: e.target.vaule,
  });
};

  render() {
    return(
      <>
        <h1>{this.State.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input maxLength={4} value={this.state.value} onChange={this.onChangeInput} />
        </form>
        <div>시도: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map( (v,i) => {
            return(
              // 고유한 key값을 꼭 넣어줘야 한다.
            <Try key={`${i+1}차 시도: `} tryInfo={v} index={i}/>
            );
          })}
        </ul>
      </>
    )
  }
}

export default NumberBaseball;