import React, { useState } from 'react';

import { Divider, Nutrition, Result, ResultBox } from './styled';

function Menu({ data }) {
    // 하위 컴포넌트 각각에 state를 부여해야함
    const [changeResultState, setChangeResultState] = useState(false);
    const slide = (item) => {
        if (item.open !== undefined) {
            item.open = !item.open;
        } else {
            item.open = true;
        }
    };

    return (
        <ResultBox>
            {/* 영양성분 국문화 */}
            {/* id, name, category 제외 */}
            {/* 단위 추가 */}
            {data
                ? data.map((item) => (
                      <>
                          <Result key={item.id}>
                              <p
                                  style={{ cursor: 'pointer' }}
                                  onClick={() => {
                                      slide(item);
                                      setChangeResultState((prev) => !prev);
                                  }}
                              >
                                  {item.name}
                              </p>

                              <Nutrition
                                  style={{
                                      display: 'flex',
                                      flexDirection: 'column',
                                  }}
                                  item={item}
                                  open={item.open}
                              />

                              <Divider
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ delay: 0.5 }}
                              />
                          </Result>
                      </>
                  ))
                : null}
        </ResultBox>
    );
}
export default React.memo(Menu);
