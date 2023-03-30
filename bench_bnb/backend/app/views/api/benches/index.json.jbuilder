json.benches do 
@benches.each do |bench|
    json.set! bench.id do 
        # json.id bench.id 
        # json.title bench.title 
        # json.description bench.description 
        # json.price bench.price 
        # json.seating bench.seating
        # json.lat bench.lat 
        # json.lng bench.lng 
        json.extract! bench,:id,:title,:description,:price,:seating,:lat,:lng
    end 
end 
end 