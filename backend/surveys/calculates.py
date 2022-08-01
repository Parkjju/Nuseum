def calculate_balance(s_data):

  # hash_map = {'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0, 'q5': 0, 'q6': 0, 'q7': 0, 'q8': 0, 'q9': 0, 'q10': 0, 'q11': 0, 'q12': 0, 'q13': 0, 'q14': 0, 'q15': 0}
  hash_map = {'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0, 'q5': 0, 'q6': 0, 'q7': 0}
  for i in range(1, 8): # 1 ~ 7
    hash_map[f'q{i}'] = (s_data[f'q{i}'] - 1) * 25

  return (hash_map['q1'] * 0.121) + (hash_map['q2'] * 0.166) + (hash_map['q3'] * 0.11) + (hash_map['q4'] * 0.101) + (hash_map['q5'] * 0.184) + (hash_map['q6'] * 0.097) + (hash_map['q7'] * 0.221)

def calculate_temperance(s_data):

  # hash_map = {'q1': 0, 'q2': 0, 'q3': 0, 'q4': 0, 'q5': 0, 'q6': 0, 'q7': 0, 'q8': 0, 'q9': 0, 'q10': 0, 'q11': 0, 'q12': 0, 'q13': 0, 'q14': 0, 'q15': 0}
  hash_map = {'q8': 0, 'q9': 0, 'q10': 0, 'q11': 0}
  for i in range(8, 12): # 8 ~ 11
    hash_map[f'q{i}'] = (5 - s_data[f'q{i}']) * 25

  return (hash_map['q8'] * 0.18) + (hash_map['q9'] * 0.306) + (hash_map['q10'] * 0.248) + (hash_map['q11'] * 0.266)

def calculate_execution(s_data):

  hash_map = {'q12': 0, 'q13': 0, 'q14': 0, 'q15': 0}
  hash_map['q12'] = (s_data['q12'] - 1) * 25
  hash_map['q13'] = (s_data['q13'] - 1) * 25
  hash_map['q14'] = (5 - s_data['q14']) * 25
  hash_map['q15'] = (s_data['q15'] - 1) * 25

  return (hash_map['q12'] * 0.447) + (hash_map['q13'] * 0.179) + (hash_map['q14'] * 0.253) + (hash_map['q15'] * 0.121)

def calculate_nutrition_index(balance, temperance, execution):
  return (balance * 0.4) + (temperance * 0.15) + (execution * 0.45)