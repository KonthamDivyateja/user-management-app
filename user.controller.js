import { supabase } from "../config/supabase.js";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export const createUser = async (req, res) => {
  try {
    const { name, email, password, age, role } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const { data, error } = await supabase.from("users").insert([
      {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword,
        age,
        role: role || "user"
      }
    ]);

    if (error) return res.status(400).json({ message: error.message });

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  const { data, error } = await supabase.from("users").select("*");

  if (error) return res.status(400).json({ message: error.message });

  res.json(data);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ message: "User not found" });

  res.json(data);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("users")
    .update(req.body)
    .eq("id", id);

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: "User updated successfully" });
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("users")
    .delete()
    .eq("id", id);

  if (error) return res.status(400).json({ message: error.message });

  res.json({ message: "User deleted successfully" });
};
