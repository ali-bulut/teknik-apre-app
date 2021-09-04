class WebApi::PartySerializer < ActiveModel::Serializer
    attributes :id, :name, :code, :netWeightDivisionNum, :grossWeightAdditionNum, :template
  
    def netWeightDivisionNum
      object.net_weight_division_num
    end
  
    def grossWeightAdditionNum
      object.gross_weight_addition_num
    end
    
    def template
        object.template
    end
  
  end
  