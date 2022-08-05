import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { Nutrition, Result, ResultBox } from './styled';

function Menu({ data }) {
    // 하위 컴포넌트 각각에 state를 부여해야함
    const [changeResultState, setChangeResultState] = useState(false);
    const slide = (item) => {
        if (item.open !== undefined) {
            item.open = !item.open;
        } else {
            item.open = true;
        }
        console.log(`item: ${item.name}`);
        console.log(item.open);
    };

    return (
        <ResultBox transition={{}}>
            {/* 영양성분 국문화 */}
            {/* id, name, category 제외 */}
            {/* 단위 추가 */}
            {data
                ? data.map((item) => (
                      <Result
                          key={item.id}
                          onClick={() => {
                              slide(item);
                              setChangeResultState((prev) => !prev);
                          }}
                      >
                          <p>{item.name}</p>

                          <Nutrition
                              style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                              }}
                              item={item}
                              open={item.open}
                          />
                      </Result>
                  ))
                : null}
        </ResultBox>
    );
}
export default React.memo(Menu);
