json.bench do 
    json.id @bench.id
    json.extract! @bench,:title,:description,:price,:seating,:lat,:lng
end 