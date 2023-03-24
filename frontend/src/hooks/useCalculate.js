const useCalculate = (gender, age) => {
    let range = {
        energy: null,
        protein: null, //단백질
        fat: null, // 지방
        carbohydrate: null, // 탄수화물
        dietary_fiber: null, // 식이섬유
        magnesium: null, // 마그네슘
        vitamin_a: null, // 비타민 A
        vitamin_d: null, // 비타민 D
        vitamin_b6: null, // 비타민 B6
        folic_acid: null, // 엽산
        vitamin_b12: null, // 비타민 B12
        tryptophan: null, // 트립토판
        dha_epa: null, // DHA+EPA
    };
    if (age >= 1 && age <= 2) {
        range.dietary_fiber = 15;
        range.magnesium = 70;
        range.vitamin_a = 250;
        range.vitamin_d = 5;
        range.vitamin_b6 = 0.6;
        range.vitamin_b12 = 0.9;
        range.folic_acid = 150;
        range.tryptophan = 100;
        range.dha_epa = null;
    } else if (age >= 3 && age <= 5) {
        range.dietary_fiber = 20;
        range.magnesium = 110;
        range.vitamin_a = 300;
        range.vitamin_d = 5;
        range.vitamin_b6 = 0.7;
        range.vitamin_b12 = 1.1;
        range.folic_acid = 180;
        range.tryptophan = 100;
        range.dha_epa = null;
        range.carbohydrate = 65;
        range.protein = 20;
        range.fat = 30;
    } else if (gender === 'M') {
        if (age >= 6 && age <= 8) {
            range.dietary_fiber = 25;
            range.magnesium = 150;
            range.vitamin_a = 450;
            range.vitamin_d = 5;
            range.vitamin_b6 = 0.9;
            range.vitamin_b12 = 1.3;
            range.folic_acid = 220;
            range.tryptophan = 200;
            range.dha_epa = 200;
        } else if (age >= 9 && age <= 11) {
            range.dietary_fiber = 25;
            range.magnesium = 220;
            range.vitamin_a = 600;
            range.vitamin_d = 5;
            range.vitamin_b6 = 1.1;
            range.vitamin_b12 = 1.7;
            range.folic_acid = 300;
            range.tryptophan = 200;
            range.dha_epa = 200;
        } else if (age >= 12 && age <= 14) {
            range.dietary_fiber = 30;
            range.magnesium = 320;
            range.vitamin_a = 750;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.5;
            range.vitamin_b12 = 2.3;
            range.folic_acid = 360;
            range.tryptophan = 300;
            range.dha_epa = 230;
        } else if (age >= 15 && age <= 18) {
            range.dietary_fiber = 30;
            range.magnesium = 410;
            range.vitamin_a = 850;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.5;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 400;
            range.dha_epa = 230;
        } else if (age >= 19 && age <= 29) {
            range.dietary_fiber = 30;
            range.magnesium = 360;
            range.vitamin_a = 800;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.5;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 300;
            range.dha_epa = 210;
        } else if (age >= 30 && age <= 49) {
            range.dietary_fiber = 30;
            range.magnesium = 370;
            range.vitamin_a = 800;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.5;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 300;
            range.dha_epa = 400;
        } else if (age >= 50 && age <= 64) {
            range.dietary_fiber = 30;
            range.magnesium = 370;
            range.vitamin_a = 750;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.5;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 300;
            range.dha_epa = 500;
        } else if (age >= 65 && age <= 74) {
            range.dietary_fiber = 25;
            range.magnesium = 370;
            range.vitamin_a = 700;
            range.vitamin_d = 15;
            range.vitamin_b6 = 1.5;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 300;
            range.dha_epa = 310;
        } else if (age >= 75) {
            range.dietary_fiber = 25;
            range.magnesium = 370;
            range.vitamin_a = 700;
            range.vitamin_d = 15;
            range.vitamin_b6 = 1.5;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 300;
            range.dha_epa = 280;
        }
    } else if (gender === 'F') {
        if (age >= 6 && age <= 8) {
            range.dietary_fiber = 20;
            range.magnesium = 150;
            range.vitamin_a = 400;
            range.vitamin_d = 5;
            range.vitamin_b6 = 0.9;
            range.vitamin_b12 = 1.3;
            range.folic_acid = 220;
            range.tryptophan = 200;
            range.dha_epa = 200;
        } else if (age >= 9 && age <= 11) {
            range.dietary_fiber = 25;
            range.magnesium = 220;
            range.vitamin_a = 550;
            range.vitamin_d = 5;
            range.vitamin_b6 = 1.1;
            range.vitamin_b12 = 1.7;
            range.folic_acid = 300;
            range.tryptophan = 200;
            range.dha_epa = 150;
        } else if (age >= 12 && age <= 14) {
            range.dietary_fiber = 25;
            range.magnesium = 290;
            range.vitamin_a = 650;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.4;
            range.vitamin_b12 = 2.3;
            range.folic_acid = 360;
            range.tryptophan = 300;
            range.dha_epa = 210;
        } else if (age >= 15 && age <= 18) {
            range.dietary_fiber = 25;
            range.magnesium = 340;
            range.vitamin_a = 650;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.4;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 300;
            range.dha_epa = 100;
        } else if (age >= 19 && age <= 29) {
            range.dietary_fiber = 20;
            range.magnesium = 280;
            range.vitamin_a = 650;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.4;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 300;
            range.dha_epa = 150;
        } else if (age >= 30 && age <= 49) {
            range.dietary_fiber = 20;
            range.magnesium = 280;
            range.vitamin_a = 650;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.4;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 300;
            range.dha_epa = 260;
        } else if (age >= 50 && age <= 64) {
            range.dietary_fiber = 20;
            range.magnesium = 280;
            range.vitamin_a = 600;
            range.vitamin_d = 10;
            range.vitamin_b6 = 1.4;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 300;
            range.dha_epa = 240;
        } else if (age >= 65 && age <= 74) {
            range.dietary_fiber = 20;
            range.magnesium = 280;
            range.vitamin_a = 600;
            range.vitamin_d = 15;
            range.vitamin_b6 = 1.4;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 200;
            range.dha_epa = 150;
        } else if (age >= 75) {
            range.dietary_fiber = 20;
            range.magnesium = 280;
            range.vitamin_a = 600;
            range.vitamin_d = 15;
            range.vitamin_b6 = 1.4;
            range.vitamin_b12 = 2.4;
            range.folic_acid = 400;
            range.tryptophan = 200;
            range.dha_epa = 140;
        }
    }

    return { ...range };
};

export default useCalculate;
