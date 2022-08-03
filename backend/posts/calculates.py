def calculate(meal, amount,  result, c_result):
  # result = [0] * 13 # 12개 index
  for i in range(len(meal)):
    result[0] += meal[i].energy * amount[i] / 100
    result[1] += meal[i].carbohydrate * amount[i]  / 100
    result[2] += meal[i].protein * amount[i] / 100
    result[3] += meal[i].fat * amount[i] / 100
    result[4] += meal[i].dietary_fiber * amount[i] / 100
    result[5] += meal[i].magnesium * amount[i] / 100
    result[6] += meal[i].vitamin_c * amount[i] / 100
    result[7] += meal[i].vitamin_d * amount[i] / 100
    result[8] += meal[i].vitamin_b6 * amount[i] / 100
    result[9] += meal[i].vitamin_b12 * amount[i] / 100
    result[10] += meal[i].folic_acid * amount[i] / 100
    result[11] += meal[i].tryptophan * amount[i] / 100
    result[12] += meal[i].dha_epa * amount[i] / 100
    # 카테고리 추가
    c_result |= meal[i].category.values_list()
  return result, c_result
