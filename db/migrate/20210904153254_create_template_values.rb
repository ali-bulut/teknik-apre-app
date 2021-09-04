class CreateTemplateValues < ActiveRecord::Migration[6.0]
  def change
    create_table :template_values do |t|
      t.string :column_name
      t.boolean :is_calculated
      t.boolean :is_entered
      t.references :template, null: false, foreign_key: true

      t.timestamps
    end
  end
end
