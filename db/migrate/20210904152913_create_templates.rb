class CreateTemplates < ActiveRecord::Migration[6.0]
  def change
    create_table :templates do |t|
      t.string :name
      t.text :description
      t.text :html_path
      t.text :image_path

      t.timestamps
    end
  end
end
