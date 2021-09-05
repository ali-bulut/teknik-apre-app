class BarcodeMainValue < ApplicationRecord
  belongs_to :template_value
  belongs_to :barcode
end
