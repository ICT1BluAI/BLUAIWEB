from flask import Flask, render_template, request
import numpy as np
import pandas as pd

app = Flask(__name__)

historical_data = pd.read_csv('updated_dataset.csv')

def calculate_price(total_floor_area, num_floors, num_doors, num_windows, roof_area):
    screen_sand = 1100
    Kabilya = 250
    hollow_blocks_per_sqm = 12  
    hollow_block_cost = 250  
    cement_mean = 265
    door_mean = 3860
    window_mean = 5450
    price_sqm = 8000  
    roof_cost = 4700  
    
    num_hollow_blocks = total_floor_area * hollow_blocks_per_sqm
    
    hollow_block_cost_per_property = num_hollow_blocks * hollow_block_cost
    
    price = (total_floor_area + roof_area) * price_sqm + num_floors * cement_mean + num_floors * screen_sand + num_floors * Kabilya + num_doors * door_mean + num_windows * window_mean
    
    price += hollow_block_cost_per_property
    
    return price

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        budget = float(request.form['budget'])
        num_floors = int(request.form['num_floors'])

        total_floor_area = 0
        num_doors = 0
        num_windows = 0
        for i in range(1, num_floors + 1):
            total_floor_area += float(request.form[f'floor_area_{i}'])
            num_doors += float(request.form[f'num_doors_{i}'])
            num_windows += float(request.form[f'num_windows_{i}'])

        roof_area = float(request.form[f'roof_area']) if num_floors >= 1 else 0

        predicted_price = calculate_price(total_floor_area, num_floors, num_doors, num_windows, roof_area)

        if predicted_price <= budget:
            result = f"The predicted price is within the budget: {predicted_price:.2f}"
        else:
            result = f"The predicted price exceeds the budget: {predicted_price:.2f}"

        return render_template('index.html', result=result)

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
