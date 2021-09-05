class CreateBarcodeMainValues < ActiveRecord::Migration[6.0]
  def change
    create_table :barcode_main_values do |t|
      t.string :value
      t.references :template_value, null: false, foreign_key: true
      t.references :barcode, null: false, foreign_key: true

      t.timestamps
    end
  end
end
