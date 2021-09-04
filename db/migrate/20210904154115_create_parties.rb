class CreateParties < ActiveRecord::Migration[6.0]
  def change
    create_table :parties do |t|
      t.string :name
      t.string :code
      t.float :net_weight_division_num
      t.float :gross_weight_addition_num
      t.references :template, null: false, foreign_key: true

      t.timestamps
    end
  end
end
