class UpdatePartiesTableColumns < ActiveRecord::Migration[6.0]
  def change
    remove_column :parties, :name
    remove_column :parties, :code
    remove_column :parties, :net_weight_division_num
    remove_column :parties, :gross_weight_addition_num
    remove_reference :parties, :template, foreign_key: true

    add_column :parties, :party_num, :string
    add_reference :parties, :barcode, foreign_key: true
  end
end
