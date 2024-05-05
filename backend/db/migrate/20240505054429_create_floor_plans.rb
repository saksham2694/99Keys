class CreateFloorPlans < ActiveRecord::Migration[7.1]
  def change
    create_table :floor_plans do |t|
      t.string :name
      t.integer :interior_size
      t.integer :exterior_size
      t.string :exterior_type
      t.string :facing_direction
      t.string :floor_type

      t.timestamps
    end
  end
end
